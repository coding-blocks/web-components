<svelte:options tag="promotion-banner" />

<a class="d-block" target="_blank" href={link}>
  <img src={img_url} alt="" class="w-100">
</a>

<script>
  import { onMount } from 'svelte';

  let img_url = ''
  let link = ''

  onMount(async () => {
    const response = await fetch(`https://hack-api.codingblocks.com/api/v2/dashboard-banners`)
    const { data: [data] } = await response.json()
    const attrs = data.attributes
    
    img_url = attrs['image-url']
    link = attrs.link
  
  })

</script>

<style>
.d-block {
  display: block;
}
.w-100 {
  display: block;
}
</style>

