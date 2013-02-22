/*
	jQuery Quick Pagination v0.1.0
	A lightweight pagination plugin for jQuery
	Based on work by  Sam Deering - http://www.jquery4u.com/tutorials/jquery-quick-pagination-list-items

	Read more here: https://github.com/jlafitte/jquery-quick-pagination
	
	Basic Usage: jQuery(<list selector>).quickPagination();
 */
(function ($) {
    $.fn.quickPagination = function (options) {
        var defaults = {
            pageSize: 10,	// How many items you want to show per page.
            navigation: true,	// Prev/Next navigation buttons.
            currentPage: 1,	// Starting page... normally you would probably leave this alone.
            holder: null,	// Container to place the navigation.
            pagerLocation: "after",	// possible values are "before,after,both".  Will not do anything if you specified a container in the holder option.
            transitionSpeed: null // Changes the speed items are faded in and out.  If left null then no transitions will happen.
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
            if (navigation == true) {
            	var pageNav = "<div class='navigationPrev'></div><ul class='simplePagerNav'>";
            }
            else {
            	var pageNav = "<ul class='simplePagerNav'>";
            }
            for (i = 1; i <= pageCounter; i++) {
                if (i == options.currentPage) {
                    pageNav += "<li class='currentPage simplePageNav" + i + "'><a rel='" + i + "' href='#'>" + i + "</a></li>";
                } else {
                    pageNav += "<li class='simplePageNav" + i + "'><a rel='" + i + "' href='#'>" + i + "</a></li>";
                }
            }
            if (navigation == true) {
            	pageNav += "</ul><div class='navigationNext'></div>";
            }
            else {
            	pageNav += "</ul>";
            }
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
            selector.parent().find(".simplePagerNav a").click(function (e) {
            	e.preventDefault(); // keeps the page from jumping around by ignoring the #
                var clickedLink = $(this).attr("rel");
                options.currentPage = clickedLink;

                var container = options.holder ? options.holder : ".simplePagerContainer"
                
                $(this).parents(container).find("li.currentPage").removeClass("currentPage");
                $(this).parents(container).find("a[rel='" + clickedLink + "']").parent("li").addClass("currentPage");

                selector.children().hide();
                
                if (options.transitionSpeed) {
                	selector.find(".simplePagerPage" + clickedLink).fadeIn(transitionSpeed);
                } else {
                	selector.find(".simplePagerPage" + clickedLink).show();
                }
                
                return false;
            });
        });
    }
})(jQuery);
