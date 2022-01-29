export default function LogIn() {
  return (
    <div class="w-full h-screen flex items-center justify-center">
      <form class="w-full md:w-1/3 bg-white rounded-lg">
          <div class="flex font-bold justify-center mt-6">
              <img class="h-20 w-20"
                  src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"/>
          </div>
          <h2 class="text-3xl text-center text-gray-700 mb-4">LogIn Form</h2>
          <div class="px-12 pb-10">
              <div class="w-full mb-2">
                  <div class="flex items-center">
                      <i class='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user'></i>
                      <input type='text' placeholder="Username"
                          class="-mx-6 px-8  w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" />
                  </div>
              </div>
          </div>
              <div class="w-full mb-2">
                  <div class="flex items-center">
                      <i class='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock'></i>
                      <input type='text' placeholder="Password"
                          class="-mx-6 px-8 w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" />
                  </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <a href="#" class="text-xs text-green-500 float-right mb-4">Sign Up</a>
                <a href="#" class="text-xs text-gray-500 float-right mb-4">Forgot Password?</a>
              </div>
              <button type="submit"
                  class="w-full py-2 rounded-full bg-green-600 text-gray-100  focus:outline-none">Button</button>
      </form>
   </div>
  )
}