<script>
import {
  layoutComputed
} from "@/state/helpers";

export default {
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
    };
  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {};
      },
    },
  },

  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },


  mounted() {
    this.initActiveMenu();
    if (this.rmenu == 'vertical' && this.layoutType == 'twocolumn') {
      document.documentElement.setAttribute("data-layout", "vertical");
    }
    document.getElementById('overlay').addEventListener('click', () => {
      document.body.classList.remove('vertical-sidebar-enable');
    });

    window.addEventListener("resize", () => {
      if (this.layoutType == 'twocolumn') {
        var windowSize = document.documentElement.clientWidth;
        if (windowSize < 767) {
          document.documentElement.setAttribute("data-layout", "vertical");
          this.rmenu = 'vertical';
          localStorage.setItem('rmenu', 'vertical');
        } else {
          document.documentElement.setAttribute("data-layout", "vertical");
          this.rmenu = 'twocolumn';
          localStorage.setItem('rmenu', 'twocolumn');
          setTimeout(() => {
            this.initActiveMenu();
          }, 50);

        }
      }
    });
    if (document.querySelectorAll(".navbar-nav .collapse")) {
      let collapses = document.querySelectorAll(".navbar-nav .collapse");

      collapses.forEach((collapse) => {
        // Hide sibling collapses on `show.bs.collapse`
        collapse.addEventListener("show.bs.collapse", (e) => {
          e.stopPropagation();
          let closestCollapse = collapse.parentElement.closest(".collapse");
          if (closestCollapse) {
            let siblingCollapses =
              closestCollapse.querySelectorAll(".collapse");
            siblingCollapses.forEach((siblingCollapse) => {
              if (siblingCollapse.classList.contains("show")) {
                siblingCollapse.classList.remove("show");
                siblingCollapse.parentElement.firstChild.setAttribute("aria-expanded", "false");
              }
            });
          } else {
            let getSiblings = (elem) => {
              // Setup siblings array and get the first sibling
              let siblings = [];
              let sibling = elem.parentNode.firstChild;
              // Loop through each sibling and push to the array
              while (sibling) {
                if (sibling.nodeType === 1 && sibling !== elem) {
                  siblings.push(sibling);
                }
                sibling = sibling.nextSibling;
              }
              return siblings;
            };
            let siblings = getSiblings(collapse.parentElement);
            siblings.forEach((item) => {
              if (item.childNodes.length > 2) {
                item.firstElementChild.setAttribute("aria-expanded", "false");
                item.firstElementChild.classList.remove("active");
              }
              let ids = item.querySelectorAll("*[id]");
              ids.forEach((item1) => {
                item1.classList.remove("show");
                item1.parentElement.firstChild.setAttribute("aria-expanded", "false");
                item1.parentElement.firstChild.classList.remove("active");
                if (item1.childNodes.length > 2) {
                  let val = item1.querySelectorAll("ul li a");

                  val.forEach((subitem) => {
                    if (subitem.hasAttribute("aria-expanded"))
                      subitem.setAttribute("aria-expanded", "false");
                  });
                }
              });
            });
          }
        });

        // Hide nested collapses on `hide.bs.collapse`
        collapse.addEventListener("hide.bs.collapse", (e) => {
          e.stopPropagation();
          let childCollapses = collapse.querySelectorAll(".collapse");
          childCollapses.forEach((childCollapse) => {
            let childCollapseInstance = childCollapse;
            childCollapseInstance.classList.remove("show");
            childCollapseInstance.parentElement.firstChild.setAttribute("aria-expanded", "false");
          });
        });
      });
    }
  },

  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0].offsetTop;
        if (currentPosition > 500)
          if (this.$refs.isSimplebar)
            this.$refs.isSimplebar.value.getScrollElement().scrollTop = currentPosition + 300;
      }
    },

    initActiveMenu() {
      const pathName = window.location.pathname;
      const ul = document.getElementById("navbar-nav");
      if (ul) {
        const items = Array.from(ul.querySelectorAll("a.nav-link"));
        let activeItems = items.filter((x) => x.classList.contains("active"));
        this.removeActivation(activeItems);
        let matchingMenuItem = items.find((x) => {
          return x.getAttribute("href") === pathName;
        });
        if (matchingMenuItem) {
          this.activateParentDropdown(matchingMenuItem);
        } else {
          var id = pathName.replace("/", "");
          if (id) document.body.classList.add("twocolumn-panel");
          this.activateIconSidebarActive(pathName);
        }
      }
    },
    removeActivation(items) {
      items.forEach((item) => {
        if (item.classList.contains("menu-link")) {
          if (!item.classList.contains("active")) {
            item.setAttribute("aria-expanded", false);
          }
          item.nextElementSibling.classList.remove("show");
        }
        if (item.classList.contains("nav-link")) {
          if (item.nextElementSibling) {
            item.nextElementSibling.classList.remove("show");
          }
          item.setAttribute("aria-expanded", false);
        }
        item.classList.remove("active");
      });
    },

    activateParentDropdown(item) {
      // navbar-nav menu add active
      item.classList.add("active");
      let parentCollapseDiv = item.closest(".collapse.menu-dropdown");
      if (parentCollapseDiv) {
        // to set aria expand true remaining
        parentCollapseDiv.classList.add("show");
        parentCollapseDiv.parentElement.children[0].classList.add("active");
        parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
        if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
          if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling) {
            if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling.parentElement.closest(".collapse.menu-dropdown")) {
              const grandparent = parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling.parentElement.closest(".collapse.menu-dropdown");
              this.activateIconSidebarActive("#" + grandparent.getAttribute("id"));
              grandparent.classList.add("show");
            }
          }
          this.activateIconSidebarActive("#" + parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")
            .getAttribute("id"));

          parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
          if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
            parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
          return false;
        }
        this.activateIconSidebarActive("#" + parentCollapseDiv.getAttribute("id"));
        return false;
      }
      return false;
    },
    activateIconSidebarActive(id) {
      var menu = document.querySelector(
        "#two-column-menu .simplebar-content-wrapper a[href='" +
        id +
        "'].nav-icon"
      );
      if (menu !== null) {
        menu.classList.add("active");
      }
    },
  },
};
</script>

<template>
  <BContainer fluid>
    <div id="two-column-menu"></div>

    <template v-if="layoutType === 'vertical' || layoutType === 'semibox'">
      <ul class="navbar-nav h-100 side-menu" id="navbar-nav">
        <li class="nav-item mb-2">
          <router-link class="nav-link menu-link" to="/dashboard">
            <img src="@/assets/images/sidebar/icon/dashboard.svg" alt="dashboard" class="me-2">
            <span data-key="t-dashboard" class="nav-item-text">Dashboard</span>
          </router-link>
        </li>

        <li class="nav-item mb-2">
          <router-link class="nav-link menu-link" to="/inventory-management">
            <img src="@/assets/images/sidebar/icon/setting.svg" alt="administrator" class="me-2">
            <span data-key="t-inventory-management" class="nav-item-text">Inventory Management</span>
          </router-link>
        </li>

        <li class="nav-item mb-2">
          <router-link class="nav-link menu-link" to="/program-maintenance">
            <img src="@/assets/images/sidebar/icon/calendar.svg" alt="role" class="me-2">
            <span data-key="t-program-maintenance" class="nav-item-text">Program Maintenance</span>
          </router-link>
        </li>

        <li class="nav-item mb-2">
          <router-link class="nav-link menu-link" to="/fleet-management">
            <img src="@/assets/images/sidebar/icon/bulldozer.svg" alt="fleet-management" class="me-2">
            <span data-key="t-fleet-management" class="nav-item-text">Fleet Management</span>
          </router-link>
        </li>

        <li class="nav-item mb-2">
          <router-link class="nav-link menu-link" to="/issue-report">
            <img src="@/assets/images/sidebar/icon/document.svg" alt="issue-report" class="me-2">
            <span data-key="t-issue-report" class="nav-item-text">Issue Report</span>
          </router-link>
        </li> 

        <li class="nav-item mb-2">
          <router-link class="nav-link menu-link" to="/work-order-report">
            <img src="@/assets/images/sidebar/icon/enginer.svg" alt="work-order-report" class="me-2">
            <span data-key="t-work-order-report" class="nav-item-text">Work Order Report</span>
          </router-link>
        </li>

        <li class="nav-item mb-2"> 
          <router-link class="nav-link menu-link" to="/backlog-report">
            <img src="@/assets/images/sidebar/icon/engineer2.svg" alt="backlog-report" class="me-2">
            <span data-key="t-backlog-report" class="nav-item-text">Backlog Report</span>
          </router-link>
        </li>

        <li class="nav-item mb-2"> 
          <router-link class="nav-link menu-link" to="/inspection-template">
            <img src="@/assets/images/sidebar/icon/magnify.svg" alt="inspection-template" class="me-2">
            <span data-key="t-setting" class="nav-item-text">Inspection Template</span>
          </router-link>
        </li>
        <li class="nav-item mb-2"> 
          <router-link class="nav-link menu-link" to="/inspection-response">
            <img src="@/assets/images/sidebar/icon/paper.svg" alt="inspection-response" class="me-2">
            <span data-key="t-setting" class="nav-item-text">Inspection Response</span>
          </router-link>
        </li>

        <hr>

        <li class="nav-item mb-2"> 
          <router-link class="nav-link menu-link" to="/role-management">
            <img src="@/assets/images/sidebar/icon/role.svg" alt="role-management" class="me-2">
            <span data-key="t-role-management" class="nav-item-text">Role Management</span>
          </router-link>
        </li>

        <li class="nav-item mb-2"> 
          <router-link class="nav-link menu-link" to="/user-management">
            <img src="@/assets/images/sidebar/icon/administrator.svg" alt="user-management" class="me-2">
            <span data-key="t-user-management" class="nav-item-text">User Management</span>
          </router-link>
        </li>

      </ul>
    </template>
  </BContainer>
</template>


<style scoped>
.navbar-menu .navbar-nav .nav-link.active{
  background-color: #28282E;
  border-radius: 3px;
}
.navbar-menu .navbar-nav .nav-link{
  font-size: 13px;
  font-weight: 600;
}
.side-menu li{
  padding: 0px 20px;
}
</style>
