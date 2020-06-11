<svelte:options tag="demographic-form" />

{#if user.id && user.demographic.collegeId === 1 && !user.demographic.otherCollege}
<div class="border-card b-red p-0">
  <div class="bg-gradient-pink white p-4">
    <div class="font-md bold">
      Get INR 1000 Credits
    </div>
    <div class="mt-4">
      Complete your Profile &amp; get INR 1000 credits in your wallet
    </div>
  </div>
  {#if result.success}
    <div class="my-5 t-align-c">
      <div class="font-md gradient-text extra-bold mt-4">Your profile has been updated !</div>
    </div>
  {:else}
    <div class="py-4 px-5 t-align-center">
      <select 
        bind:value={selectedCollegeId} 
        class="input-text br-50 my-2">
        <option disabled selected value>-- College --</option>
        {#each colleges as college}
          <option 
            value={college.id} 
            selected={college.id === selectedCollegeId}>
            {college.name}
          </option>
        {/each}
      </select>
      {#if selectedCollegeId === 1}
        <input 
          bind:value={selectedOtherCollege}
          type="text" 
          placeholder="Other College Name"
          class="input-text br-50 my-2" />
      {/if}
      <select 
        bind:value={selectedGraduationYear} 
        class="input-text br-50 my-2">
        <option disabled selected value>-- Graduation Year --</option>
        {#each graduationYears as year}
          <option 
            value={year} 
            selected={year === selectedGraduationYear}>
            {year}
          </option>
        {/each}
      </select>
      <select 
        bind:value={selectedBranchId} 
        class="input-text br-50 my-2">
        <option disabled selected value>-- Branch --</option>
        {#each branches as branch}
          <option 
            value={branch.id} 
            selected={branch.id === selectedBranchId}>
            {branch.name}
          </option>
        {/each}
      </select>

      <div class="d-flex justify-content-center mt-5">
        <button 
          id="updatedButton"
          class="button-solid button-orange"
          on:click={handleUpdate}>
          Update Profile
        </button>
      </div>

      {#if result.error}
      <div class="row justify-content-center">
        <p class="red">
          {result.error}
        </p>
      </div>
      {/if}
    </div>
  {/if}
</div>
{/if}

<script>
  import { onMount, createEventDispatcher } from 'svelte'

  import oneauth from './oneauth.js'

  let selectedCollegeId = null
  let selectedBranchId = null
  let selectedGraduationYear = null
  let selectedOtherCollege = ''
  let colleges = []
  let branches = []
  let graduationYears = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
    2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000]
  let user = {}
  let result = {
    success: null,
    error: null
  }

  const dispatch = createEventDispatcher();

  onMount(async () => {
    user = await oneauth.fetchUser()
    if (user.id) {
      colleges = await oneauth.fetchColleges()
      branches = await oneauth.fetchBranches()
      selectedGraduationYear = user.graduationYear
      selectedCollegeId = user.demographic.collegeId
      selectedBranchId = user.demographic.branchId
      selectedOtherCollege = user.demographic.otherCollege
    }
  })

  const handleUpdate = async () => {
    try {
      const resp = await oneauth.updateUser({
        gradYear: selectedGraduationYear,
        collegeId: selectedCollegeId,
        branchId: selectedBranchId,
        otherCollege: selectedOtherCollege
      })
      dispatch('updated', resp)
      result = {
        success: resp.success
      }
      setTimeout(async () => {
        user = await oneauth.fetchUser()
      }, 2000)
    } catch (err) {
      result = {
        error: err
      }
    }
  }
</script>

<style>
</style>

<link rel="stylesheet" href="https://unpkg.com/@coding-blocks/motley@0.7.4/dist/online-cb/app.min.css" />
