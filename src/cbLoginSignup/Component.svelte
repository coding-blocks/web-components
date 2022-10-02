<svelte:options tag="cb-login-signup" />
<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600&display=swap" rel="stylesheet">
</svelte:head>


<div class="blurrer" on:click={hideLoginPrompt}></div>

<div id="cb-login-signup" class="cb-login-signup-container">
  <div class="d-flex justify-content-between align-items-center mb-5">
    <h2>Login / Signup</h2>
    <button style="color: #3B4254;" on:click={hideLoginPrompt}>
      <img src="https://minio.codingblocks.com/public/cross-black.png" alt="">
    </button>
  </div>

  <div class="mb-4">Sign In with Email</div>
  
  {#if errorMessage}
    <div class="red">{errorMessage}</div>
  {/if}
  {#if otpId} 
    <input type="number" placeholder="Enter OTP" class="w-100 mb-4" bind:value={otp}/>
    <button class="btn btn-primary w-100" disabled={!!!otp} on:click={verifyOtp}>Verify OTP</button>
  {:else}
    <input type="email" placeholder="Enter Email" class="w-100 mb-4" bind:value={email}/>
    <button class="btn btn-primary w-100" disabled={!!!email} on:click={sendOtp}>Sign In</button>
  {/if}

  <div class="d-flex justify-content-center align-items-center" style="margin: 30px 0px;">
    <span class="hr"></span>
    <span class="px-5">OR</span>
    <span class="hr"></span>
  </div>
  <a href={googleLoginUrl}>
    <button class="btn btn-secondary white w-100 mb-3">
      <img class="logo" src="https://minio.codingblocks.com/public/google-logo.png" alt="">
      <span class="logo-text">Sign in with Google</span>
    </button>
  </a>
  <a href={facebookLoginUrl}>
    <button  class="btn btn-secondary white w-100 mb-5">
      <img class="logo" src="https://minio.codingblocks.com/public/facebook-logo.png" alt="">
      <span class="logo-text">Sign in with facebook</span>
    </button>
  </a>

  <div class="mb-5 pt-5">
    <div class="header">Find your dream job</div>
    <div class="sub-header mb-4">Trsuted by 100k+ students</div>
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
  const appSubdomain = window.location.host.split('.')[0]
  const clientIdMap = {
    'hack': 2146237097,
    'online': 5633768694,
    'hire': 4190457915,
    'code-gym': 9706874989
  }
  const apiMap = {
    sendOtp: {
      'hack': 'https://hack-api.codingblocks.com/api/v2/jwt/otp',
      'online': 'https://online-api.codingblocks.com/api/v2/jwt/otp/email',
      'hire': 'https://hire-api.codingblocks.com/login/otp/email',
      'code-gym': 'https://code-gym-api.codingblocks.com/api/jwt/otp'
    },
    verifyOtp: {
      'hack': 'https://hack-api.codingblocks.com/api/v2/jwt/otp/verify',
      'online': 'https://online-api.codingblocks.com/api/v2/jwt/otp/email/verify',
      'hire': 'https://hire-api.codingblocks.com/login/otp/email/verify',
      'code-gym': 'https://code-gym-api.codingblocks.com/api/jwt/verify'
    }
  }

  let email = null;
  let otp = null
  let otpId = null;
  let errorMessage = null
  let showLoginPrompt = localStorage.getItem('cb_login_prompt') === 'true' ? true : false
  let googleLoginUrl = `https://account.codingblocks.com/login/google/v2?redirect_uri=https://${appSubdomain}.codingblocks.com&client=${appSubdomain}-codingblocks&client_id=${clientIdMap[appSubdomain]}`
  let facebookLoginUrl = `https://account.codingblocks.com/login/facebook/v2?redirect_uri=https://${appSubdomain}.codingblocks.com&client=${appSubdomain}-codingblocks&client_id=${clientIdMap[appSubdomain]}`

  async function sendOtp() {
    const response = await fetch(apiMap.sendOtp[appSubdomain] || 'http://localhost:3000/api/v2/jwt/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })
    let { id } = await response.json()
    otpId = id
  }

  async function verifyOtp() {
    errorMessage = null

    const response = await fetch(apiMap.verifyOtp[appSubdomain] || 'http://localhost:3000/api/v2/jwt/otp/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
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

  function hideLoginPrompt() {
    document.getElementsByTagName('cb-login-signup')[0].classList.add('hide-cb-login-signup-prompt')
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


  .cb-login-signup-container {
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

  :host(.hide-cb-login-signup-prompt) .cb-login-signup-container{
    right: -100vw;
  }

  :host(.hide-cb-login-signup-prompt) .blurrer {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .cb-login-signup-container {
      width: 35vw;
    }

    :host(.hide-cb-login-signup-prompt) .cb-login-signup-container{
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
