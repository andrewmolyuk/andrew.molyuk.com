<script>
  export let segment;
</script>

<style lang="scss" scoped>
  @import "../global.scss";
  nav {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    h1 {
      a {
        text-decoration: none;
        color: $font-color;
      }
    }
    ul {
      list-style-type: none;
      text-align: right;
      li {
        display: inline;
        padding: 0 1em;
        a {
          text-decoration: none;
          color: $menu-color;
          padding: 0.3em 0;
        }
        a.selected {
          color: $font-color;
          border-bottom: 1px solid $font-color;
        }
      }
    }
  }
</style>

<nav>
  <h1>
    <a href="/">#andrewmolyuk</a>
  </h1>
  <ul>
    <li>
      <a class:selected="{segment === undefined}" href=".">Info</a>
    </li>
    <li>
      <a class:selected="{segment === 'works'}" href="works">Works</a>
    </li>
    <li>
      <a class:selected="{segment === 'resources'}" href="resources">Resources</a>
    </li>
  </ul>
</nav>
