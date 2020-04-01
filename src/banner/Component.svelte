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
    <img src={img_url} alt="" width="100%">
  </a>
{/if}


<script>
  import { onMount } from 'svelte';  

  let img_url = ''
  let link = ''
  let showBanner = true
  let toggle_url = ''

  export let showToggle = true
  export let theme = 'light'

  onMount(async () => {
    const response = await fetch(`https://hack-api.codingblocks.com/api/v2/dashboard-banners`)
    const { data: [data] } = await response.json()
    const attrs = data.attributes
    
    img_url = attrs['image-url']
    link = attrs.link

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
</style>

