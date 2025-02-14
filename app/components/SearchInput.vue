<template>
    <div class="flex rounded-full border border-gray-300 overflow-hidden">
        <input
          type="text"
          placeholder="Suchen ..."
          class="w-full px-4 py-2 text-gray-700 focus:outline-none"
        />
      
        <button class="flex px-4 py-2 bg-gray-300 text-white hover:bg-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
    </div>

  <slot />
</template>