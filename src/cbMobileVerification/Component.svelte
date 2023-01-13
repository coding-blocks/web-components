<svelte:options tag="cb-mobile-verification" />
<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600&display=swap" rel="stylesheet">
</svelte:head>


<div class="blurrer"></div>

<div id="cb-mobile-verification" class="cb-mobile-verification-container">
  <div class="d-flex justify-content-between align-items-center mb-5">
    <h2>Verify Your Mobile</h2>
  </div>
  
  {#if errorMessage}
    <div class="red">{errorMessage}</div>
  {/if}
  
  {#if otpId} 
    <input type="number" placeholder="Enter OTP" class="w-100 mb-4" bind:value={otp}/>
    <button class="btn btn-primary w-100" disabled={!!!otp} on:click={verifyOtp}>Verify OTP</button>
  {:else}
    <input type="number" placeholder="Enter 10 digit Mobile Number" class="w-100 mb-4" bind:value={mobile}/>
    <button class="btn btn-primary w-100" disabled={!!!mobile} on:click={sendOtp}>Send OTP</button>
  {/if}

  {#if showLogoutButton}
    <a href={apiMap.logout[appSubdomain]}>
      <button class="btn btn-primary w-100 my-3">Logout</button>
    </a>
  {/if}
  

  <div class="mb-5 pt-5">
    <div class="header">Find your dream job</div>
    <div class="sub-header mb-4">Trusted by 100k+ students</div>
    <img src="https://minio.codingblocks.com/public/company-logo-group.png" alt="">
  </div>

  <div class="position-absolute">
    <a href="https://www.linkedin.com/school/codingblocksindia/" target="_blank">
      <img class="social-media-logo mr-2" src="https://minio.codingblocks.com/public/linkedin-logo.png" alt="">
    </a>
    <a href="https://twitter.com/codingblocksIN" target="_blank">
      <img class="social-media-logo mr-2" src="https://minio.codingblocks.com/public/twitter-logo.png" alt="">
    </a>
    <a href="https://github.com/coding-blocks" target="_blank">
      <img class="social-media-logo" src="https://minio.codingblocks.com/public/github-logo.png" alt="">
    </a>
    <div>
      <a href="https://codingblocks.com/tos.html" class="sub-header" target="_blank"> Coding Blocks | Terms of service</a>
    </div>
  </div>
</div>

<script>
  import { onMount } from "svelte";

  let authCookie = null;
  const appSubdomain = window.location.host.split('.')[0]
  const apiMap = {
    sendOtpMobile: {
      'hack': 'https://hack-api.codingblocks.com/api/v2/jwt/otp',
      'online': 'https://online-api.codingblocks.com/api/v2/jwt/otp/mobile',
      'hire': 'https://hire-api.codingblocks.com/login/otp/mobile',
      'code-gym': 'https://code-gym-api.codingblocks.com/api/jwt/otp'
    },
    verifyOtpMobile: {
      'hack': 'https://hack-api.codingblocks.com/api/v2/jwt/otp/verify',
      'online': 'https://online-api.codingblocks.com/api/v2/jwt/otp/mobile/verify',
      'hire': 'https://hire-api.codingblocks.com/login/otp/mobile/verify',
      'code-gym': 'https://code-gym-api.codingblocks.com/api/jwt/otp/verify'
    },
    logout: {
      'hack': '/app/logout',
      'online': '/app/logout',
      'hire': '/logout',
      'code-gym': '/logout'
    }
  }

  let mobile = null;
  let otp = null
  let otpId = null;
  let errorMessage = null
  let showLogoutButton = false

  onMount(() => {
    authCookie = document.cookie.split('; ').filter(_ => _.split('=')[0] === 'cb_auth')[0].split('=')[1]
  })

  async function sendOtp() {
    const response = await fetch(apiMap.sendOtpMobile[appSubdomain] || 'http://localhost:3000/api/jwt/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mobile
      })
    })
    if(response.ok) {
      let { id } = await response.json()
      otpId = id
    } else {
      const { message } = await response.json()
      if(message) {
        errorMessage = message
        if(message.includes('Try logging in with that account.')) {
          showLogoutButton = true
        }
      }
    }
  }

  async function verifyOtp() {
    errorMessage = null

    const response = await fetch(apiMap.verifyOtpMobile[appSubdomain] + '?flow=mobile-verification' || 'http://localhost:3000/api/jwt/otp/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + authCookie
      },
      credentials: 'include',
      body: JSON.stringify({
        mobile,
        otp_id: otpId,
        otp
      })
    })
    
    if(response.ok) {
      window.location.reload()
    } else {
      const { message } = await response.json()
      if(message) {
        errorMessage = message
      }
    }
  }
  
</script>

<link rel="stylesheet" href="https://unpkg.com/@coding-blocks/motley@2.8.6/dist/account/app.min.css">
<style>
  input {
    border: none;
    border-bottom: solid 1px #E95547;
    background: #15171E;
    padding: 10px 0px;
  }

  .blurrer {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #939393;
    opacity: 0.5;
  }


  .cb-mobile-verification-container {
    background: #15171E;
    color: white;
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    z-index: 1001;
    top: 0;
    right: 0;
    padding: 5rem 3rem 3rem 3rem;
    font-family: 'Mulish';
    transition: 0.5s;
  }

  :host(.hide-cb-mobile-verification-prompt) .cb-mobile-verification-container{
    right: -100vw;
  }

  :host(.hide-cb-mobile-verification-prompt) .blurrer {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .cb-mobile-verification-container {
      width: 35vw;
    }

    :host(.hide-cb-mobile-verification-prompt) .cb-mobile-verification-container{
      right: -35vw;
    }
  }

  .btn {
    padding: 10px 10px;
    border-radius: 3px;
  }

  
  .btn.btn-primary {
    background: linear-gradient(90deg, #F26A3E 0%, #FB8133 100%);
  }
  
  .btn.btn-secondary {
    background: #15171E;
    border: 1px solid #373E4F;
  }
  
  .btn:disabled{
    background: #939393;
  }

  .logo {
    width: 20px;
  }

  .logo-text {
    display: inline-block;
    transform: translate(5px, -4px);
  }

  .header {
    font-size: 20px;
  }

  .hr {
    display: inline-block;
    width: 40%;
    border: solid 0.5px #373E4F;
  }

  .sub-header {
    font-size: 12px;
    color: #BDBDBD;
  }

  .social-media-logo {
    width: 15px;
  }
</style>
