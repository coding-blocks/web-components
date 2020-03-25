<svelte:options tag="cb-mobile-navbar" />

<script>
  import MobileClassroomCourses from './mobile-classroom-courses.svelte'
  import MobileOnlineCourses from './mobile-online-courses.svelte'

  // by default use latest motley version for unpkg
  export let css = "https://unpkg.com/@coding-blocks/motley/dist/app.min.css"
  export let tab = "classroom"
  export let showhamburger = false
  export let logo = 'https://codingblocks.com/assets/images/cb/cblogo.png'

  const toggleHamburgerNav = () => showhamburger = !showhamburger
</script>

<link rel="stylesheet" href={css} />
<link href="https://minio.codingblocks.com/hackerblocks-images/Gilroy.ttf" rel="stylesheet">

<div class="hamburger-nav b-right overflow-y-auto no-scrollbar {!showhamburger && "hamburger-nav--hidden"} ">
	<div class="d-flex py-3 justify-content-between align-items-center hamburger-nav__top-bar">
		<img src={logo} alt="HB" class="hamburger-nav__ham-logo ml-4">
		<img src="https://minio.codingblocks.com/amoeba/wrong-close.png" alt="#" class="mr-4 hamburger-nav__cross pointer" on:click={toggleHamburgerNav}>
	</div>
	<div class="divider-h"></div>

  <slot></slot>

	<div class="mt-4 px-4 overflow-y-auto no-scrollbar">
		<div class="d-flex justify-content-between">
			<div class="card-md extra-bold orange">Courses</div>
			<a href="#" class="orange"><i class="fas fa-angle-up fa-lg"></i></a>
		</div>
		<div class="my-4 pl-4">
			<div class="hamburger-nav__menu-element {tab == 'classroom' && 'active'}">
				<div class="card-md extra-bold" on:click={() => tab = "classroom"}>Classroom Courses</div>
				<div class="card-sm light"><a href="#" class="orange">Explore All</a></div>
      </div>
      {#if tab=="classroom"}
      <MobileClassroomCourses />
      {/if}
		</div>
		<div class="my-4 pl-4">
			<div class="hamburger-nav__menu-element {tab == 'online' && 'active'}">
				<div class="card-md extra-bold" on:click={() => tab = "online"}>Online Courses</div>
				<div class="card-sm light"><a href="#" class="orange">Explore All</a></div>
      </div>
      {#if tab=="online"}
      <MobileOnlineCourses />
      {/if}
		</div>
	  <div class="card-md light my-4">
      <a href="https://codingblocks.com/campus-ambassador-program.html" target="blank">
        Campus Ambassadors
      </a>
    </div>
    <div class="card-md light my-4">
      <a href="https://codingblocks.com/about" target="blank">
        About Us
      </a>
    </div>
    <div class="card-md light my-4">
      <a href="https://codingblocks.com/centres" target="blank">
        Contact Us
      </a>
    </div>
	</div>
</div>
