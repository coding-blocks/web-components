<svelte:options tag="demographic-form" />

{#if user.id}
<div class="border-card b-red p-0">
  <div class="bg-gradient-pink white p-4">
    <div class="font-md bold">
      Get INR 1000 Credits
    </div>
    <div class="mt-4">
      Complete your Profile & get INR 1000 credits in your wallet
    </div>
  </div>
  <div class="py-4 px-5 t-align-center">
    <select 
      bind:value={selectedCollegeId} 
      class="input-text br-50 pr-5 my-2">
      <option disabled selected value>-- College --</option>
      {#each colleges as college}
        <option 
          value={college.id} 
          selected={college.id === selectedCollegeId}>
          {college.name}
        </option>
      {/each}
    </select>
    <select 
      bind:value={selectedGraduationYear} 
      class="input-text br-50 pr-5 my-2">
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
      class="input-text br-50 pr-5 my-2">
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
        class="button-solid button-orange"
        on:click|preventDefault={handleUpdate}>
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
</div>
{/if}

<script>
  import { onMount } from 'svelte'

  const oneAuthApi = 'http://test.oneauth/api'

  let selectedCollegeId = null
  let selectedBranchId = null
  let selectedGraduationYear = null
  let colleges = []
  let branches = []
  let graduationYears = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
    2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000]
  let user = {}
  
  let result = {
    success: null,
    error: null
  }

  const fetchUser = () =>
    fetch(oneAuthApi + '/users/me?include=demographic', {
      credentials: 'include'
    })
      .then(resp => resp.json())
  const fetchColleges = () => 
    fetch(oneAuthApi + '/colleges')
      .then(resp => resp.json())
  const fetchBranches = () => 
    fetch(oneAuthApi + '/branches')
      .then(resp => resp.json())

  onMount(async () => {
    user = await fetchUser()
    if (user.id) {
      colleges = await fetchColleges()
      branches = await fetchBranches()
      selectedGraduationYear = user.graduationYear
      selectedCollegeId = user.demographic.collegeId
      selectedBranchId = user.demographic.branchId
    }
  })

  const handleUpdate = async () => {
    try {
      const result = await fetch(oneAuthApi + `/users/${user.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gradYear: selectedGraduationYear,
          collegeId: selectedCollegeId,
          branchId: selectedBranchId
        })
      })
        .then(resp => resp.json())
      result.success = result.success
    } catch (err) {
      result.error = err
    }
  }
</script>

<style>
</style>

<link rel="stylesheet" href="https://unpkg.com/@coding-blocks/motley@0.7.4/dist/online-cb/app.min.css" />
