<svelte:options tag="demographic-form" />

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
    <select class="input-text br-50 pr-5 my-2">
      <option disabled selected value>-- College --</option>
      {#each colleges as college}
        <option value={college.id}>{college.name}</option>
      {/each}
    </select>
    <select class="input-text br-50 pr-5 my-2">
      <option disabled selected value>-- Graduation Year --</option>
      {#each graduationYears as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
    <select class="input-text br-50 pr-5 my-2">
      <option disabled selected value>-- Branch --</option>
      {#each branches as branch}
        <option value={branch.id}>{branch.name}</option>
      {/each}
    </select>

    <div class="d-flex justify-content-center mt-5">
      <button class="button-solid button-orange">
        Update Profile
      </button>
    </div>
  </div>
</div>

<script>
  import { onMount } from 'svelte'

  let colleges = []
  let branches = []
  let graduationYears = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
    2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000]

  const fetchColleges = () => 
    fetch('http://test.oneauth/api/colleges')
      .then(resp => resp.json())
  const fetchBranches = () => 
    fetch('http://test.oneauth/api/branches')
      .then(resp => resp.json())

  onMount(async () => {
    colleges = await fetchColleges()
    branches = await fetchBranches()
  })
</script>

<style>
</style>

<link rel="stylesheet" href="https://unpkg.com/@coding-blocks/motley@0.7.4/dist/online-cb/app.min.css" />
