<template>
  <div class="full">
    <Header />
    <div class="app full__content">
      <!-- ASIDE -->
      <aside>
        <nav>
          <ul>
            <li
              v-for="(link, l_idx) in links"
              :key="l_idx"
              class="link"
              :class="{'link--selected': idx === l_idx}"
              @click="idx = l_idx"
            >
              <div class="icon">
                <i :class="link.icon"></i>
              </div>
              <span>{{link.text}}</span>
            </li>
          </ul>
        </nav>
      </aside>
      <!-- CONTENT -->
      <div class="content">
        <div style="height: 100%" v-for="(link, l_idx) in links" :key="l_idx" v-show="idx==l_idx">
          <slot :name="l_idx"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  props: ["links"],
  data: () => ({
    idx: 0
  }),
  components: {
    Header
  }
};
</script>

<style lang='scss' scoped>
.app {
  overflow-y: hidden;
  display: flex;
}
aside {
  flex-shrink: 0;
  padding: 20px 0;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 90;
  nav {
    ul {
      padding: 0;
      margin: 0;
      list-style-type: none;
      .link {
        padding: 18px 24px 18px 18px;
        transition: all 0.3s;
        color: #2e2e2e;
        font-weight: bold;
        font-size: 0.9rem;
        border-right: 3px solid #fff;
        cursor: pointer;
        //
        display: flex;
        align-items: center;
        &:hover {
          background: #f7faff;
          border-right: 3px solid #b1c6e6;
        }
        .icon {
          width: 20px;
          margin-right: 12px;
          color: #0070c4;
          font-size: 1.1rem;
          text-align: center;
        }
      }
      .link--selected {
        background: #eaf1ff;
        border-right: 3px solid #0070c4;
        &:hover {
          background: #eaf1ff;
          border-right: 3px solid #0070c4;
        }
      }
    }
  }
}
.content {
  overflow-y: auto;
  position: relative;
  flex-grow: 1;
  // background: #f2f7fb;
}

@media only screen and (max-width: 955px) {
  .app {
    flex-direction: column;
  }
  aside {
    padding: 0;
    nav {
      width: max-content;
      margin: 0 auto;
      ul {
        display: flex;
        .link {
          padding: 12px 16px;
          border-right: none;
          border-bottom: 3px solid #fff;
          &:hover {
            background: #f7faff;
            border-right: none;
            border-bottom: 3px solid #b1c6e6;
          }
          .icon {
            margin-right: 8px;
          }
        }
        .link--selected {
          border-right: none;
          border-bottom: 3px solid #0070c4;
          &:hover {
            border-right: none;
            border-bottom: 3px solid #0070c4;
          }
        }
      }
    }
  }
}
</style>