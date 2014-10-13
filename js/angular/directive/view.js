/**
 * @ngdoc directive
 * @name ionView
 * @module ionic
 * @restrict E
 * @parent ionNavView
 *
 * @description
 * A container for content, used to tell a parent {@link ionic.directive:ionNavBar}
 * about the current view.
 *
 * @usage
 * Below is an example where our page will load with a navbar containing "My Page" as the title.
 *
 * ```html
 * <ion-nav-bar></ion-nav-bar>
 * <ion-nav-view class="slide-left-right">
 *   <ion-view title="My Page">
 *     <ion-content>
 *       Hello!
 *     </ion-content>
 *   </ion-view>
 * </ion-nav-view>
 * ```
 *
 * @param {string=} title The title to display on the parent {@link ionic.directive:ionNavBar}.
 * @param {boolean=} hide-back-button Whether to hide the back button on the parent
 * {@link ionic.directive:ionNavBar} by default.
 * @param {boolean=} hide-nav-bar Whether to hide the parent
 * {@link ionic.directive:ionNavBar} by default.
 */
IonicModule
.directive('ionView', function() {
  return {
    restrict: 'EA',
    priority: 1000,
    require: ['^?ionModal'],
    compile: function(tElement) {
      tElement.addClass('pane');
      tElement[0].removeAttribute('title');

      return function link($scope, $element, $attr, ctrls) {
        var navViewCtrl = $element.inheritedData('$ionNavViewController');
        var modalCtrl = ctrls[0];

        // don't bother if inside a modal or there's no parent navView
        if (!navViewCtrl || modalCtrl) return;

        $scope.$on('$ionicView.beforeEnter', function(ev, transData) {
          if (!transData.notified) {
            transData.notified = true;

            navViewCtrl.beforeEnter({
              title: $attr.title,
              direction: transData.direction,
              transition: transData.transition,
              showBack: transData.showBack
            });

          }
        });


        $scope.$on('$ionicView.afterEnter', function() {
          $element.removeClass('nav-view-cache');
        });

        // var hideBackAttr = angular.isDefined($attr.hideBackButton) ?
        //   $attr.hideBackButton :
        //   'false';
        // $scope.$watch(hideBackAttr, function(value) {
        //   // should we hide a back button when this tab is shown
        //   navBarCtrl.showBackButton(!value);
        // });

        var hideNavAttr = angular.isDefined($attr.hideNavBar) ?
          $attr.hideNavBar :
          'false';

        $scope.$watch(hideNavAttr, function(value) {
          // should the nav bar be hidden for this view or not?
          navViewCtrl.showBar(!value);
        });

      };
    }
  };
});
