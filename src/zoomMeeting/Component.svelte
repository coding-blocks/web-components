<svelte:options tag="zoom-meeting" />

<svelte:head>
  <script src="https://source.zoom.us/1.8.5/lib/vendor/react.min.js"></script>
  <script src="https://source.zoom.us/1.8.5/lib/vendor/react-dom.min.js"></script>
  <script src="https://source.zoom.us/1.8.5/lib/vendor/redux.min.js"></script>
  <script src="https://source.zoom.us/1.8.5/lib/vendor/redux-thunk.min.js"></script>
  <script src="https://source.zoom.us/1.8.5/lib/vendor/jquery.min.js"></script>
  <script src="https://source.zoom.us/1.8.5/lib/vendor/lodash.min.js"></script>
  <script src="https://source.zoom.us/zoom-meeting-1.8.5.min.js" bind:this={script}></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';

  let script;
  
  export let leaveUrl = '/';
  export let meetingnumber;
  export let signature;
  export let apikey;
  export let username;
  export let useremail;

	onMount(async () => {
		script.addEventListener('load', () => {
      console.log(meetingnumber)
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareJssdk();
      function beginJoin() {
        ZoomMtg.init({
          leaveUrl,
          success: function () {
            ZoomMtg.join({
              meetingNumber: meetingnumber,
              userName: username,
              signature,
              apiKey: apikey,
              userEmail: useremail,
              success: function (res) {
                console.log('success')
              },
              error: function (res) {
                console.log(res);
              },
            });
          },
          error: function (res) {
            console.log(res);
          },
        });
      }
      beginJoin();
    })
	});

</script>
