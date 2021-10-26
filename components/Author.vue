<template>
  <div>
    <div class="divider"></div>
    <div class="card lg:card-side bordered">
      <div class="flex flex-col items-center justify-center m-10 md:m-0">
        <div class="avatar">
          <div class="mb-8 ml-2 rounded-full w-32 h-32">
            <img src="/dabiddo__.jpg" alt="me" />
          </div>
        </div>
      </div>
      <div class="card-body">
        <h2 class="card-title">David Torres</h2>
        <p>Backend Developer</p>
        <div class="card-actions">
          <a href="https://www.twitter.com/dabiddokun" class="btn btn-ghost">
            <font-awesome-icon :icon="['fab', 'twitter']" />
            <span class="ml-1">twitter</span>
          </a>
          <a href="https://www.github.com/dabiddo" class="btn btn-ghost">
            <font-awesome-icon :icon="['fab', 'github']" />
            <span class="ml-1">github</span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>
