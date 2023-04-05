<svelte:options tag="cb-navbar" />

<div class="a-hb d-md-block d-none bg-background-main-3 white">

  <div class="border">
    <div class="d-flex {topStyle} py-3 pr-5">
      <span class="px-3 pointer position-relative {activeTab === "courses" && "active-tab"}" on:click={() => {toggleExpanded(); activeTab = "courses";}}>
        Courses
        <img 
          src="https://minio.cb.lk/public/fa-5.13/svgs/solid/chevron-{expanded ? 'up' : 'down'}.svg" 
          alt="chevron" 
          class="d-inline s-10x10"/>
      </span>
      <div class="px-3 position-relative {activeTab === "about" && "active-tab"}">
        <a class="white" href="https://codingblocks.com/about.html" target="_blank" on:click={() => activeTab = "about"}>About Us</a>
      </div>
      <div class="px-3 position-relative {activeTab === "resources" && "active-tab"}">
        <a class="white" href="https://codingblocks.com/resources" target="_blank" on:click={() => activeTab = "resources"}>Resources</a>
      </div>
      <div class="px-3 position-relative {activeTab === "ca" && "active-tab"}">
        <a class="white" href="https://codingblocks.com/campus-ambassador-program.html" target="_blank" on:click={() => activeTab = "ca"}>Campus Ambassadors</a>
      </div>
      <div class="px-3 position-relative {activeTab === "contact" && "active-tab"}">
        <a class="white" href="https://codingblocks.com/centres/" target="_blank" on:click={() => activeTab = "contact"}>Contact Us</a>
      </div>
      <slot name="header"></slot>
    </div>

  </div>

  {#if expanded}
    <div class="row no-gutters cb-navbar-expanded" style="overflow: hidden">
      <div class="cb-navbar-side col-3">
        <div class="py-5 font-md bold hover-grey">
          <div class="font-lg my-4 offset-3">Our Courses</div>
        </div>
        <div class="py-4 font-md bold hover-grey {activeCoursesTab == 'online' && 'selected'}"  on:click={() => activeCoursesTab = "online"}>
          <div class="offset-3">
            <div>Online Courses</div>
            <a href="https://online.codingblocks.com/courses" target="_blank" class="font-mds orange"> 
              Explore all 
            </a>
          </div>
        </div>
        <div class="py-4 font-md bold hover-grey {activeCoursesTab == 'classroom' && 'selected'}" on:click={() => activeCoursesTab = "classroom"}>
          <div class="offset-3">
            <div>Classroom Courses</div>
            <a href="https://codingblocks.com/classroom-courses/" target="_blank" class="font-mds orange"> 
              Explore all 
            </a>
          </div>
        </div>
        
        
      </div>
      <div class="col-9 font-mds">
        {#if activeCoursesTab=="classroom"}
          <ClassroomCourses />
        {:else}
          <OnlineCourses />
        {/if}
      </div>
    </div>
  {/if}
</div>

<script>
  import ClassroomCourses from './classroom-courses.svelte'
  import OnlineCourses from './online-courses.svelte'

  // by default use latest motley version for unpkg
  export let topalign = "center"
  export let expanded = false
  export let activeTab = ""
  export let activeCoursesTab = "online"
  export let css = "https://unpkg.com/@coding-blocks/motley/dist/online-cb/app.min.css"

  let topStyle = 'justify-content-center'

  $: switch (topalign) {
    case 'left': topStyle = 'justify-content-start'; break;
    case 'right': topStyle = 'justify-content-end'; break;
    default: topStyle = 'justify-content-center'
  }

  const toggleExpanded = () => expanded = !expanded

</script>

<style>
    a:hover {
      text-decoration: underline;
    }

    .hover-grey.selected:hover {
      background: unset;
    }

    .a-hb {
      display: none;
    }

    .active-tab:after{
      content: "";
      width: 98%;
      height: 2px;
      position: absolute;
      left: -2px;
      bottom: -16px;
      display: block;
      background: linear-gradient(90deg, #FB8530 0%, #FEB50B 100%);
    }
    
</style>

<link rel="stylesheet" href={css} />
<link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,600,700,800" rel="stylesheet">
<link href="https://minio.codingblocks.com/hackerblocks-images/Gilroy.ttf" rel="stylesheet">
