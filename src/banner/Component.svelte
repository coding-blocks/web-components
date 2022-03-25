<svelte:options tag="promotion-banner" />

{#if showBanner}
  <div class="carousel">
    {#each banners as { img_url, img_url_mobile, link }, index}
      {#if visibleBannerIndex == index }
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
    {/each}
  </div>
{/if}


<script>
  import {onMount} from 'svelte';
  import { fade } from 'svelte/transition'
  let showBanner = false
  let toggle_url = ''
  let banners = []
  let visibleBannerIndex = 0
  let interval = false

  export let showToggle = true
  export let theme = 'light'

  onMount(async () => {
    
    const response = await fetch(`http://test.hackbackend/api/v2/dashboard-banners`, {
      headers: {
        client: 'hack-admin',
      }
    })
    const { data } = await response.json()
    banners = data.map(b => {
      return {
        img_url: b.attributes["image-url"],
        img_url_mobile: b.attributes["mobile-image-url"],
        link: b.attributes.link
      }
    })

    toggle_url = theme === 'light' ? 'https://minio.codingblocks.com/motley/wrong_g_white.min.png' : 'https://minio.codingblocks.com/motley/wrong_g.png'

    showBanner = !!banners.length

    console.log(showBanner)
    if(!interval) {
      startCarousel('hello')
    }
  })

  const startCarousel = (str) => {
    if(!!interval) {
      console.log(interval)
      clearInterval(interval);
    }
    interval = setInterval(() => {
      if(visibleBannerIndex == banners.length - 1) {
        visibleBannerIndex = 0;
      } else {
        visibleBannerIndex += 1;
      }
    }, 7000);
  }

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

.carousel{
  height: 116px;
  overflow: hidden;
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

