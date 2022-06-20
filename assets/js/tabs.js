const removeActiveClasses = function (ulElement) {
    const lis = ulElement.querySelectorAll('li');
    Array.prototype.forEach.call(lis, function(li) {
        li.classList.remove('active');
    });
  }

  const getChildPosition = function (element) {
        var parent = element.parentNode;
        var i = 0;
        for (var i = 0; i < parent.children.length; i++) {
            if (parent.children[i] === element) {
                return i;
            }
        }

        throw new Error('No parent found');
    }

window.addEventListener('load', function () {
    const tabLinks = document.querySelectorAll('ul.tab > li a');
    const tabContents = document.querySelectorAll('ul.tab-content > li');

    Array.prototype.forEach.call(tabLinks, function(link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        liTab = link.parentNode;
        ulTab = liTab.parentNode;
        position = getChildPosition(liTab);
        if (liTab.className.includes('active')) {
          return;
        }

        removeActiveClasses(ulTab);
        tabContentId = ulTab.getAttribute('data-tab');
        tabContentElement = document.getElementById(tabContentId);
        removeActiveClasses(tabContentElement);

        tabContents[position].classList.add('active');
        liTab.classList.add('active');
        console.log(tabContentId, tabContentElement);
      }, false);
    });
});