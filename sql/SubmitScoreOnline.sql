set ANSI_NULLS ON
set QUOTED_IDENTIFIER ON
go


--------游戏结果提交 联机
ALTER PROCEDURE [dbo].[SubmitScoreOnline] 
  @WinnerID  int,
	@LoserID  int,
	@GID int,
	@GameInvite bit,  ---如果为邀请 则为1 ；随机 则为0
	@howToWin varchar(30),
	@WinnerScore float,
	@LoserScore float,
	@state int output
AS
BEGIN
	SET NOCOUNT ON;
	declare @WinnerLevel int ,@LoserLevel int,@SeasonState bit;
	declare @winnerIncrease int,@LoserDecrease int;
	declare @WinnerJoinPF bit,@LoserJoinPF bit;

	-------更新点击率--------!!!           HitCount++
	update [game] set GameHitCountTotal=GameHitCountTotal+1 where GameID=@gid and GameMode=0;
	if(@@RowCount<>1)
		begin set @state = -5; return;  end; ---该游戏不存在或者不是联机游戏


	--------双方联机总次数++
	update [User] set UserOnlineGCount = UserOnlineGCount+1 where UserID=@WinnerID;
	if(@@RowCount<>1)
		begin set @state = -6; return;  end; ---玩家不存在
	update [User] set UserOnlineGCount = UserOnlineGCount+1 where UserID=@LoserID;
	if(@@RowCount<>1)
		begin set @state = -6; return;  end; ---玩家不存在


	------联机胜率 每次输赢结果更新	winrate=(OnlineGameCount*winrate+/-1)/OnlineGameCount
	update [User] set Userwinrate = (UserOnlineGCount*Userwinrate+1)/UserOnlineGCount  where UserID=@WinnerID;
	update [User] set Userwinrate = (UserOnlineGCount*Userwinrate-1)/UserOnlineGCount   where UserID=@LoserID;

	select @WinnerLevel = dbo.GetUserLevel_F(@WinnerID) , @LoserLevel= dbo.GetUserLevel_F(@LoserID);
	select @SeasonState = SysPlaySeasonState from [system];    ---如果为0则表示为常规赛，为1表示季后赛

	------往 PlayGameOnline 表里添加记录
	insert into [PlayGameOnline]
	(PGO_WinnerID,PGO_LoserID,PGOUser1ClassAtThatTime,PGOUser2ClassAtThatTime,PGOGameID, PGOIsPlayoff, PGODate, PGOHow2win , PGOIsInvite,PGOWinnerScore,PGOLoserScore)
	values
	(@WinnerID,@LoserID,@WinnerLevel,@LoserLevel,@gid,@SeasonState,GetDate(),@howToWin,@GameInvite,@WinnerScore,@LoserScore)
	if @@RowCount<>1  begin set @state = -10;  return end;

	--	看当前赛季状态,如果是季后赛:做分数有效性检查 

	if(@SeasonState =1 /*or @SeasonState is  null*/)
		--如果是季后赛:
		--a)看双方的UserJoinPlayoff字段,如果有一方不是参与季后赛的,本次结果无效.
		--b)看双方的等级是否一致，否的话，结果无效（同等级PK）
		--c)看游戏模式是否是随机，否的话结果无效。
		--d)以上皆非，则该游戏结果有效：根据结果计算公式更新双方的联机积分。
	begin
			select @WinnerJoinPF=dbo.GetUserJoinPlayOff(@WinnerID),@LoserJoinPF =dbo. GetUserJoinPlayOff(@LoserID);
			if(@WinnerJoinPF=0 or @LoserJoinPF=0)  ---任一方不参与季后赛
				begin set @state = -2;  return end;
			if(@WinnerLevel<>@LoserLevel)	---等级不一致
				begin set @state = -3; return end;				
			if(@GameInvite =1)
				begin set @state = -4; return end;
			--------双方季后赛随机局数++
			update [User] set UserPlayOffRandomCount = UserPlayOffRandomCount+1 where UserID=@WinnerID;
			update [User] set UserPlayOffRandomCount = UserPlayOffRandomCount+1 where UserID=@LoserID;
				
	end;


	---根据等级差和游戏模式 相应更新两人的联机积分
	select @winnerIncrease= winnerIncrease ,@LoserDecrease= LoserDecrease
	from dbo.OnlineGameResultPointChange(@WinnerLevel,@LoserLevel,@GameInvite);

	if(@winnerIncrease=0 and @LoserDecrease=0)
		set @state = -1;  ---表示等级差太大，结果无效
	update [User] set UserOnlineGPoint = UserOnlineGPoint+@winnerIncrease where UserID=@WinnerID;
	update [User] set UserOnlineGPoint = UserOnlineGPoint+@LoserDecrease where UserID=@LoserID;
	set @state =1;

END
