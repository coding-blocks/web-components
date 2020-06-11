<svelte:options tag="promotion-banner" />

{#if showBanner}
  <a class="d-block" target="_blank" href={link}>
    {#if showToggle}
      <img 
        class="close-icon" 
        src={toggle_url} 
        alt="close" 
        on:click|stopPropagation|preventDefault|capture={toggleBanner}
      >
    {/if}
    <img class="d-md-block" src={img_url} alt="" width="100%">
    <img class="d-md-none" src={img_url_mobile} alt="" width="100%">

  </a>
{/if}


<script>
  import { onMount } from 'svelte';  

  let img_url = ''
  let img_url_mobile = ''
  let link = ''
  let showBanner = true
  let toggle_url = ''

  export let showToggle = true
  export let theme = 'light'

  onMount(async () => {
    const response = await fetch(`https://hack-api.codingblocks.com/api/v2/dashboard-banners`, {
      headers: {
        client: 'hack-admin',
      }
    })
    const { data: [data] } = await response.json()
    const attrs = data.attributes
    
    img_url = attrs['image-url']
    link = attrs.link
    img_url_mobile = attrs['mobile-image-url']

    showBanner = !!img_url

    toggle_url = theme === 'light' ? 'https://minio.codingblocks.com/motley/wrong_g_white.min.png' : 'https://minio.codingblocks.com/motley/wrong_g.png'
  })

  const toggleBanner = () => {
    showBanner = !showBanner
  }

</script>

<style>
.d-block {
  display: block;
  position: relative;
}
.close-icon {
  position: absolute;
  right: 10px;
  cursor: pointer;
  top: 10px;
  width: 15px;
  transition: width 0.1s;
}
.close-icon:hover {
  width: 18px;
}

.d-md-none {
  display: block;
}
.d-md-block {
  display: none;
}


@media (min-width:768px) {
  .d-md-none {
    display: none;
  }
  .d-md-block {
    display: block;
  }
}





</style>

