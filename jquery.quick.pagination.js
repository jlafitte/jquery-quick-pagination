/**
 * jQuery Quick Pagination v0.1.0
 * A lightweight pagination plugin for jQuery
 * Original starting point was from: http://www.jquery4u.com/tutorials/jquery-quick-pagination-list-items
 * However I wan't able to find if a repository to contribute to, or to fork, so I create a new one:
 * https://github.com/jlafitte/jquery-quick-pagination
 *
 * Please if anyone thinks this is incorrect, let me know and I will fix it.  Thanks.
 */
(function ($) {
    $.fn.quickPagination = function (options) {
        var defaults = {
            pageSize: 10,
            currentPage: 1,
            holder: null,
            pagerLocation: "after"
        };
        var options = $.extend(defaults, options);
        return this.each(function () {
            var selector = $(this);
            var pageCounter = 1;
            if ($(".simplePagerContainer").length < 1) selector.wrap("<div class='simplePagerContainer'></div>");
            selector.parents(".simplePagerContainer").find("ul.simplePagerNav").remove();
            selector.children().removeClass(function (index, css) {
                return (css.match(/simplePagerPage[[0-9]+]?/ig) || []).join(' ');
            }).filter(":visible").each(function (i) {
                if (i < pageCounter * options.pageSize && i >= (pageCounter - 1) * options.pageSize) {
                    $(this).addClass("simplePagerPage" + pageCounter);
                } else {
                    $(this).addClass("simplePagerPage" + (pageCounter + 1));
                    pageCounter++;
                }
            });
            selector.children().hide();
            selector.children(".simplePagerPage" + options.currentPage).show();
            if (pageCounter <= 1) {
                return;
            }
            var pageNav = "<ul class='simplePagerNav'>";
            for (i = 1; i <= pageCounter; i++) {
                if (i == options.currentPage) {
                    pageNav += "<li class='currentPage simplePageNav" + i + "'><a rel='" + i + "' href='#'>" + i + "</a></li>";
                } else {
                    pageNav += "<li class='simplePageNav" + i + "'><a rel='" + i + "' href='#'>" + i + "</a></li>";
                }
            }
            pageNav += "</ul>";
            if (!options.holder) {
                switch (options.pagerLocation) {
                case "before":
                    selector.before(pageNav);
                    break;
                case "both":
                    selector.before(pageNav);
                    selector.after(pageNav);
                    break;
                default:
                    selector.after(pageNav);
                }
            } else {
                $(options.holder).append(pageNav);
            }
            selector.parent().find(".simplePagerNav a").click(function () {
                var clickedLink = $(this).attr("rel");
                options.currentPage = clickedLink;
                if (options.holder) {
                    $(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage").removeClass("currentPage");
                    $(this).parent("li").parent("ul").parent(options.holder).find("a[rel='" + clickedLink + "']").parent("li").addClass("currentPage");
                } else {
                    $(this).parent("li").parent("ul").parent(".simplePagerContainer").find("li.currentPage").removeClass("currentPage");
                    $(this).parent("li").parent("ul").parent(".simplePagerContainer").find("a[rel='" + clickedLink + "']").parent("li").addClass("currentPage");
                }
                selector.children().hide();
                selector.find(".simplePagerPage" + clickedLink).fadeIn('fast');
                return false;
            });
        });
    }
})(jQuery);