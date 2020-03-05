<script>
  export let segment;
</script>

<style>
  nav {
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 1px;
    background-color: #cccccc;
    display: block;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
    color: #cccccc;
  }
</style>

<nav>
  <ul>
    <li>
      <a class:selected="{segment === undefined}" href=".">about</a>
    </li>
    <li>
      <a class:selected="{segment === 'eltrut'}" href="eltrut">eltrut</a>
    </li>
  </ul>
</nav>
