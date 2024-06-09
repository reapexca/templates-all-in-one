var switchTabs = function () {
    var tabs, tabsWidth, tabsHeader, tabsHeaderItem, bodyWidth, itemWidth, length, tabsBody
    tabs = $(".tabs");
    tabsBody = tabs.find(".tabs_body");
    tabsHeader = $(".tabs .tabs_header");
    tabsHeaderItem = tabsHeader.find(".btn");
    tabsHeaderItem.first().addClass("selected");
    tabsBody.first().show().siblings(".tabs_body").hide();
    $.each(tabsHeaderItem, function (i, item) {
        $(item).on('click', function () {
            var key = $(item).index();
            if (tabsBody.eq(key)) {
                $(item).addClass("selected").siblings(".btn").removeClass("selected");
                tabsBody.eq(key).show().siblings(".tabs_body").hide();
            } else {
                return;
            }
        })
    });
}
switchTabs();