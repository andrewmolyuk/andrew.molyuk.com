<style lang="scss">
  @import "../global.scss";

  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 1.8em;
    font-weight: 400;
    margin: 0 0 0.5em 0;
    color: $color;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 128px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 3em;
    }
  }
</style>

<svelte:head>
  <title>Andrew Molyuk</title>
  <script src="https://kit.fontawesome.com/76b83863e9.js" crossorigin="anonymous">

  </script>
</svelte:head>

<h1>Andrew Molyuk</h1>

<figure>
  <img alt="Andrew Molyuk" src="avatar-128.png" />
  <p>
    I'm father of four, happy husband, hands-on development manager, experienced software architect, principal coder,
    skilled devops and technology guru. I’m not only used to wearing many hats, I sincerely enjoy it.
  </p>
</figure>
