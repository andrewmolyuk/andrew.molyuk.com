<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment;
</script>

<style lang="scss">
  @import "../global.scss";
  :global(body) {
    font-family: "Helvetica Neue Cyr";
    font-size: 18px;
    line-height: 1.8em;
    padding: 2em 4em;
    margin: 0;
    color: $font-color;
  }

  :global(main > h1) {
    padding: 2rem 0;
    font-size: 4em;
  }
  :global(::selection) {
    background-color: #ffffd0;
  }

  @font-face {
    font-family: "Helvetica Neue Cyr";
    font-style: normal;
    font-display: block;
    src: local("Helvetica Neue Cyr"), url(/HelveticaNeueCyrRoman.woff2) format("woff2");
    unicode-range: U+000-5FF; /* Latin glyphs */
  }
</style>

<main>
  <Nav {segment} />

  <slot />

  <Footer />
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-2324643-1">

  </script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "UA-2324643-1");
  </script>
</main>
