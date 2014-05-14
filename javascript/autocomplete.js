/**
 * Function:   Auto Complete.
 * References: xiaohaizhu83.blog.163.com/blog/static/309742201081921034238
 * @param auto: <div> to show the content.
 * @param showList: <div> to show the select row.
 * @param hideList: When Enter is pressed or certain is selected, using this control to show the content.
 * @param requestUrl: The url to send ajax request.
 * @param parameter: The attributes' name of showing and hiding.
 */
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
$.fn.autocomplete = function (auto, showList, hideList, requestUrl, parameter) {
    // Whether the input parameters are valid.
    if (!(auto && auto instanceof jQuery && requestUrl && typeof requestUrl == "string" && parameter && parameter instanceof Object)) {
        return this;
    }
    var txt = this;
    var highlightIndex = -1;
    var parameterName = parameter.dbName;
    var parameterId = parameter.dbId;

    // Configure the <div>'s style which will be used to show the effect and hiding it.
    auto.css("border", "1px solid black")
                .css("width", txt.outerWidth())
                .css("overflow", "auto")
                .css("position", "absolute")
                .css("top", txt.offset().top + txt.outerHeight() + "px")
                .css("left", txt.offset().left + "px")
                .css("background-color", "white")    // Using background color, making <div> not transparent.
                .hide();

    var timeoutId;

    // Add event listeners to monitor key board events.
    txt.keyup(function (event) {
        var myEvent = event || window.event;
        var myCode = event.keyCode;
        if (myCode >= 65 && myCode <= 90 || myCode >= 97 && myCode <= 122 || myCode == 8 || myCode == 32 || myCode == 46) {
            // Fetch the contents of text box.
            var word = $(this).val();
            word = word.Trim();
            // Hide current <div>, and remove the cursor.
            divAutoHidden();
            // If current textbox is blank, stop the request.
            if (word.length <= 0)
            { return; }

            clearTimeout(timeoutId);

            // Postpond the request, merging multiple requests.
            timeoutId = setTimeout(function () {
                ajaxRequest(requestUrl, word);
            }, 500);    //end set timeout
        } else { // end if(myCode)
            var items = auto.children("div");
            switch (myCode) {
                // up                                                                               
                case 38:
                    upHighlight(items);
                    break;
                // down                                                        
                case 40:
                    downHighlight(items);
                    break;
                // enter                            
                case 13:
                    enter(items);
                    break;
            } //end switch(myCode)
        } //end if (myCode) else
    }); //end input txt keyup


    // Hide the <div> which is used to show the contents, and remove the cursor.
    function divAutoHidden() {
        auto.hide();
        highlightIndex = -1;
    } // end div auto hidden

    // highlight
    function setCurrentHighlight(items) {
        items.eq(highlightIndex).css("background-color", "lightblue");
    } //end set current highlight

    // remove highlight
    function cancelHighlight(items) {
        if (highlightIndex != -1) {
            items.eq(highlightIndex).css("background-color", "white");
        }
    } //end cancel highlight

    // up
    function upHighlight(items) {
        // remove highlight effect of last position.
        cancelHighlight(items);
        // meke highlight index decrease by 1
        highlightIndex--;
        if (highlightIndex <= -1) {
            highlightIndex = items.length - 1;
        }
        // set current row highlight effect.
        setCurrentHighlight(items);
    } // end up highlight

    // down
    function downHighlight(items) {
        // remove hightlight effect of last position.
        cancelHighlight(items);
        //meke highlight index decrease by 1
        highlightIndex++;
        if (highlightIndex >= items.length) {
            highlightIndex = 0;
        }
        // set current row highlight effect.
        setCurrentHighlight(items);
    } //end down highlight

    // Judge whether row has been selected.
    function contains(row, val) {
        var str = val.Trim().split(';');
        for (var i = 0; i < str.length; ++i) {
            if (str[i] == row) { return true; }
        }
        return false;
    }

    // Append row to show region.
    function append(row) {
        var hval = hideList.val();
        if (!contains(row, hval)) {
            showList.append('<p>' + row + '<a href="javascript:void(0);" onclick="$(this).parent().remove();" class="s_delete_s1">&times;</a></p>');            
            // Judge whether set value to hidden 
            if (hideList && hideList instanceof jQuery) {
                hideList.val(hval + ";" + row);
            }
        }
        txt.val("");
    }

    // Enter pressed.
    function enter(items) {
        if (highlightIndex >= 0) {
            var temp = items.eq(highlightIndex).text();
            txt.val(temp);
            append(temp);

            // Hide <div>, and remove the selected cursor.
            divAutoHidden();
        }
    }

    // mouse over
    function mouseoverHighlight(items, currentDiv) {
        cancelHighlight(items);
        // set high light index
        highlightIndex = currentDiv.attr("id");
        currentDiv.css("background-color", "lightblue");
    }

    // mouse out
    function mouseoutHighlight(items) {
        cancelHighlight(items);
        highlightIndex = -1;
    }

    // mouse click
    function mouseclickHighlight(currentDiv) {
        txt.val(currentDiv.text());
        append(currentDiv.text());
        
        // Hide <div> and remove the selected cursor.
        divAutoHidden();
    }

    //ajax data request.
    function ajaxRequest(requestUrl, keyWord) {
        $.ajax({
            url: requestUrl,
            type: "post",
            data: { key: keyWord },
            dataType: "json",
            success: function (result) {
                // clear the <div>.
                auto.html("");

                // Initialize a <div> and fill it with the response result.
                // Then put this div into the div in the page.
                for (var i in result) {
                    var divTemp = $("<div>");
                    divTemp.text(result[i][parameterName])
                           .attr("id", i)
                           .css("overflow", "hidden")
                           .appendTo(auto);

                    // If send the data key.
                    if (parameterId && typeof parameterId == "string") {
                        divTemp.attr("valuedata", result[i][parameterId]);
                    }

                    var items = auto.children("div");

                    // mouse over
                    divTemp.mouseover(function () {
                        mouseoverHighlight(items, $(this));   //这里不能直接使用 divTemp
                    });
                    // mouse out
                    divTemp.mouseout(function () {
                        mouseoutHighlight(items);
                    });
                    // mouse click
                    divTemp.click(function () {
                        mouseclickHighlight($(this));
                    });
                }

                // Show the <div> which owns the contents.
                if (keyWord.length <= 0 || result.length <= 0) {
                    // Hide <div>, and remove the selected cursor.
                    divAutoHidden();
                } else {
                    auto.show();
                }

            } // end $.ajax success
        }); //end $.ajax
    } // end ajaxRequest

    return this;
}                  // end fn autocomplete