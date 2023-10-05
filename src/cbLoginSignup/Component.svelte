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

  <div class="mb-4">Sign In with 
    <button class="{loginFlow === 'email' ? 'red' : ''}" on:click={changeLoginFlow('email')}>Email</button>
    Or
    <button class="{loginFlow === 'mobile' ? 'red' : ''}" on:click={changeLoginFlow('mobile')}>Mobile</button> 
  </div>
  
  {#if errorMessage}
    <div class="red">{errorMessage}</div>
  {/if}
  {#if loginFlow === 'email'}
    {#if otpId} 
      <input type="number" placeholder="Enter OTP" class="w-100 mb-4" bind:value={otp}/>
      <button class="btn btn-primary w-100" disabled={!!!otp} on:click={verifyOtp}>Verify OTP</button>
    {:else}
      <input type="email" placeholder="Enter Email" class="w-100 mb-4" bind:value={email}/>
      <button class="btn btn-primary w-100" disabled={!!!email} on:click={sendOtp}>Send OTP</button>
    {/if}
  {:else}
    {#if otpId} 
      <input type="number" placeholder="Enter OTP" class="w-100 mb-4" bind:value={otp}/>
      <button class="btn btn-primary w-100" disabled={!!!otp} on:click={verifyOtp}>Verify OTP</button>
    {:else}
      <input type="number" placeholder="Enter 10 digit Mobile Number" class="w-100 mb-4" bind:value={mobile}/>
      <button class="btn btn-primary w-100" disabled={!!!mobile} on:click={sendOtp}>Send OTP</button>
    {/if}
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
  const appSubdomain = window.location.host.split('.')[0]
  const isStaging = window.location.host.includes('codingblocks.xyz')
  const clientIdMap = {
    'hack': 2146237097,
    'online': 5633768694,
    'hire': 4190457915,
    'codeskiller': 9706874989
  }
  const apiMap = {
    sendOtpEmail: {
      'hack': 'https://hack-api.codingblocks.com/api/v2/jwt/otp',
      'online': 'https://online-api.codingblocks.com/api/v2/jwt/otp/email',
      'hire': 'https://hire-api.codingblocks.com/login/otp/email',
      'codeskiller': 'https://code-gym-api.codingblocks.com/api/jwt/otp',
      'iccwc': 'https://iccwc.codingblocks.com/api/jwt/otp'
    },
    sendOtpMobile: {
      'hack': 'https://hack-api.codingblocks.com/api/v2/jwt/otp',
      'online': 'https://online-api.codingblocks.com/api/v2/jwt/otp/mobile',
      'hire': 'https://hire-api.codingblocks.com/login/otp/mobile',
      'codeskiller': 'https://code-gym-api.codingblocks.com/api/jwt/otp',
      'iccwc': 'https://iccwc.codingblocks.com/api/jwt/otp'
    },
    verifyOtpEmail: {
      'hack': 'https://hack-api.codingblocks.com/api/v2/jwt/otp/verify',
      'online': 'https://online-api.codingblocks.com/api/v2/jwt/otp/email/verify',
      'hire': 'https://hire-api.codingblocks.com/login/otp/email/verify',
      'codeskiller': 'https://code-gym-api.codingblocks.com/api/jwt/otp/verify',
      'iccwc': 'https://iccwc.codingblocks.com/api/jwt/otp/verify'
    },
    verifyOtpMobile: {
      'hack': 'https://hack-api.codingblocks.com/api/v2/jwt/otp/verify',
      'online': 'https://online-api.codingblocks.com/api/v2/jwt/otp/mobile/verify',
      'hire': 'https://hire-api.codingblocks.com/login/otp/mobile/verify',
      'iccwc': 'https://iccwc.codingblocks.com/api/jwt/otp/verify'
    }
  }

  let email = null;
  let mobile = null;
  let otp = null
  let otpId = null;
  let errorMessage = null
  let loginFlow = 'email'
  let showLoginPrompt = localStorage.getItem('cb_login_prompt') === 'true' ? true : false
  let googleLoginUrl = appSubdomain.includes('localhost') ? `http://localhost:3838/login/google/v2?redirect_uri=http://${appSubdomain}&client=localhost&client_id=1234567890` : isStaging ? `https://account.codingblocks.xyz/login/google/v2?redirect_uri=https://${appSubdomain}.codingblocks.xyz&client=${appSubdomain}-codingblocks&client_id=1` : `https://account.codingblocks.com/login/google/v2?redirect_uri=https://${appSubdomain}.codingblocks.com&client=${appSubdomain === 'iccwc' ? 'cricket-quiz-iccwc23' : appSubdomain}-codingblocks&client_id=${clientIdMap[appSubdomain]}`
  let facebookLoginUrl = appSubdomain.includes('localhost') ? `http://localhost:3838/login/facebook/v2?redirect_uri=http://${appSubdomain}&client=localhost&client_id=1234567890` : isStaging ? `https://account.codingblocks.xyz/login/facebook/v2?redirect_uri=https://${appSubdomain}.codingblocks.xyz&client=${appSubdomain}-codingblocks&client_id=1` : `https://account.codingblocks.com/login/facebook/v2?redirect_uri=https://${appSubdomain}.codingblocks.com&client=${appSubdomain === 'iccwc' ? 'cricket-quiz-iccwc23': appSubdomain}-codingblocks&client_id=${clientIdMap[appSubdomain]}`

  async function sendOtp() {
    errorMessage = null
    const response = await fetch(loginFlow === 'email' ? apiMap.sendOtpEmail[appSubdomain] : apiMap.sendOtpMobile[appSubdomain] || 'http://localhost:3000/api/jwt/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        mobile
      })
    })
    if(response.ok) {
      let { id, Details } = await response.json()
      otpId = id || Details
    } else {
      const { message, Details } = await response.json()
      if(message || Details) {
        errorMessage = message || Details
      }
    }
  }

  async function verifyOtp() {
    errorMessage = null

    const response = await fetch( loginFlow === 'email' ? apiMap.verifyOtpEmail[appSubdomain] : apiMap.verifyOtpMobile[appSubdomain] || 'http://localhost:3123/api/jwt/otp/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        mobile,
        otp_id: otpId,
        otp
      })
    })
    
    if(response.ok) {
      window.location.reload()
    } else {
      const { message, Details } = await response.json()
      if(message || Details) {
        errorMessage = message || Details
      }
    }
  }

  const changeLoginFlow = (flowType) => () => {
    loginFlow = flowType
    otpId = null
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
