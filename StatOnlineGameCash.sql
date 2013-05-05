set ANSI_NULLS ON
set QUOTED_IDENTIFIER ON
go

ALTER  PROCEDURE [dbo].[StatOnlineGameCash] 
--------------[功能说明]---------月底统计 计算联机组合排名返利----------------------
@msg varchar(max) out
AS
BEGIN
	declare @level int,@uid int,@hisCash float;
	------查看 系统表的Sys_Last_Statistic_Date_Online，确认此次统计距离上次统计的时间要大于Sys_statis_Least_period_Online
	declare @lastStatDdate smalldatetime,@leastStatPeriod float;
	select @lastStatDdate =Sys_Last_Statistic_Date_Online,@leastStatPeriod = Sys_statis_Least_period_Online from [system];

	if @lastStatDdate is not null  and @leastStatPeriod is not null 
		and (GetDate()-@lastStatDdate )<@leastStatPeriod
	begin	set @msg='此次结算距离上次结算小于最小结算周期！上次结算时间为'; set @msg=@msg+convert(varchar(60),@lastStatDdate)   ;return 
	end;

	declare @SeasonState bit; exec GetSeasonState @SeasonState output;
	if(@SeasonState<>1)
	begin select @msg='季后赛结束后才能结算，当前系统状态为常规赛！！' ;return 
	end;

	declare @LeastPlayOffNumber int;
	exec GetLeastPlayOffRandomNumber @LeastPlayOffNumber output;


	---------首先，如果是没有参与季后赛的同学，打折，而且没有钱
	declare @NoJoinPlayOffCoeff float;
	select @NoJoinPlayOffCoeff = Sys_No_Play_Off_coefficient from [system];
	update [user] set 
	UserOnlineGPoint =UserOnlineGPoint*@NoJoinPlayOffCoeff  ,
	UserPlayOffRandomCount = 0 
	where  dbo.GetUserJoinPlayOff(UserID)=0;

	---------然后，如果是参与了季后赛，但是随机盘数不够的同学，再打折，而且没有钱
	declare @PlayOffInsufficeCoeff float;
	select 	@PlayOffInsufficeCoeff= Sys_Play_Off_insuffice_coef from [system];
	update [user] set 
	UserOnlineGPoint = UserOnlineGPoint*@PlayOffInsufficeCoeff ,
	UserPlayOffRandomCount = 0 
	where  dbo.GetUserJoinPlayOff(UserID)=1 and UserPlayOffRandomCount <@LeastPlayOffNumber;



	-------[#TmpUser表]中是 [用户ID][用户等级]
	-------------注意了，这个表中是那些参与季后赛并且总局数足够的玩家！
	select UserID,dbo.GetUserLevel_F(UserID)as class,UserOnlineGPoint  into #TmpUser from [User] 
	where  dbo.GetUserJoinPlayOff(UserID)=1 and UserPlayOffRandomCount >=@LeastPlayOffNumber ;


	------ [#TmpCLass表]中是 [等级][该等级用户总数][该等级总金额]
	select class,count(UserID)  as userTotal ,OGCPTotalCash as cashTotal  into #TmpCLass
	from #TmpUser   join OnlineGameCashPayment on ogcpClass=class group by class 	,OGCPTotalCash order by class
	---select * from #TmpUser order by class desc ;
	---select * from #TmpCLass  ;

	DECLARE User_cur cursor  for	
	(	select UserID, (cashTotal/userTotal) as HisCash  from #TmpUser left join #TmpCLass on #TmpUser.class = #TmpCLass.class
	 );	
	------ 这个查询语句结果是 [用户ID][该用户本次返利额]=该层总金额/该层总人数
	open User_cur ;
	---遍历那些符合要求的同学-------
	while @@fetch_status=0
	BEGIN
		fetch next from User_cur into @uid ,@hisCash
		if  (@@fetch_status<>0 )  break;  -- come to the end

		-------更新用户的联机待返利金额
		update [user] set UserOnlineGCash = UserOnlineGCash+@hisCash where UserID = @uid;
		-------积分清零---		UserOnlineGPoint赋给UserOnlineGPointLastTime
		update [user] set UserOnlineGPointLastTime =UserOnlineGPoint where UserID = @uid;;
		update [user] set UserOnlineGPoint =0 where UserID = @uid;;
		update [user] set UserPlayOffRandomCount =0 where UserID = @uid;;
		------外部输出
		---select @uid ,@hisCash
	END	
	close User_cur ;		
	deallocate User_cur;

	----更新系统表的Sys_Last_Statistic_Date_Online
	update [system] set   Sys_Last_Statistic_Date_Online = GetDate();
	set @msg='成功';
END
------------------------------------

