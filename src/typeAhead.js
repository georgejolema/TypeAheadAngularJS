angular.module('easyAPI',[]).directive('typeAhead', ['$parse', '$timeout', function ($parse, $timeout)
{
    return {
        restrict: 'A',
        template: '<div class="dropdown"><ul class="dropdown-menu" aria-labelledby="dropdownMenu1"><li ng-repeat="item in $internalItemsType"><a href="#" class="type-ahead-admin">{{item.text}}</a></li></ul></div>',
        link: function (scope, el, attr)
        {
            var textAttr = attr.textLookupAttr;
            var $internalItemsType = [];
            var template = null;
            var limit = attr.limit === undefined ? null : parseInt(attr.limit);
            if (attr.templateId!==undefined) 
                template=$("script[template='" + attr.templateId + "']").html();    
            $(el)
                .addClass('dropdown-toggle')
                .attr('data-toggle', 'dropdown')
                .on('click', findData)
                .on('blur', hideDataDef);

            var content = el.find('.dropdown');
            $(el).empty();
            $(el).after(content);
            scope.$watch(attr.ngModel, function (value)
            {
                if (value != "" && value !== undefined) {
                    $internalItemsType = [];
                    var items = $parse(attr.typeAhead)(scope);
                    $.each(items, function (index, item)
                    {
                        if (item[textAttr].toUpperCase().indexOf(value.toUpperCase()) != -1)
                            $internalItemsType.push({
                                id: index,
                                text: item[textAttr],
                                obj:item
                            });
                        if (limit != null && limit == index + 1) 
                            return false;                        
                    });
                    renderData() && !!findData();
                } else 
                    hideData();                
            });

            function renderData()
            {
                var container = content.find(".dropdown-menu").empty();
                var items = 0;
                $.each($internalItemsType, function (i, value)
                {
                    if (validateFilters(value)) {
                        var listItem = $("<li>");
                        var anchor = $('<a href="#" class="item-type-ahead" data-id-item="' + value.text + '">')
                        if (template == null)
                            anchor.html(value.text)
                        else
                            anchor.html(template.replace(/(##([a-z]|_|$)(\[0-9]|[a-z]|_|$)*)/igm, function (x)
                            {
                                return value.obj[x.substring(2)];
                            }));
                        anchor.appendTo(listItem);
                        listItem.appendTo(container);
                        items++;
                    }
                });
                container.find(".item-type-ahead").on('click', function (ev)
                {
                    ev.preventDefault();
                    $parse(attr.ngModel).assign(scope, $(this).attr('data-id-item'));
                    scope.$apply();
                });
                return items > 0;
            }

            function findData()
            {
                if ($(el).val() != "")
                    content.find('.dropdown-menu').css('display', 'block');
                else
                    hideData();                
            }

            function hideData()
            {
                content.find('.dropdown-menu').css('display', 'none');
            }

            function hideDataDef()
            {
                $timeout(hideData, 300)
            }

            function validateFilters(item)
            {
                var filters = attr.filter;
                if (filters === undefined || filters=="") return true;
                filters = filters.split(',');
                for (var i = 0; i < filters.length; i++) 
                    if (!item.obj[filters[i]])
                        return false;                
                return true;
            }
        }
    }
}])