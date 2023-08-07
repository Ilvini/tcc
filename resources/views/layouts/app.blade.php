<!DOCTYPE html>
<html lang="pt-br">
<head>
	@component('includes.head')
	@endcomponent
</head>

<body>
	<header>
		@component('includes.header')
		@endcomponent
	</header>

	<main id="top">
		@yield('content')
	</main>
	<script
	src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.13/lottie.min.js"
	integrity="sha512-srGxQe2w7s50+5/nNgEVKYtBm15zRylJwdjxYnGEZr3mmHFJKFjA/ImA2OKizVzoIDX8XISMHDI1+az9pnumbQ=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
	></script>

	<!--JS bootstrap-->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
		crossorigin="anonymous"
	></script>

	<!--JS SWIPER-->
	<script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>

	<footer data-scroll>
		@component('includes.footer')
		@endcomponent
	</footer>

	{{-- sripts por CDN --}}

	<noscript>Your browser is outdated or does not support JavaScript</noscript>

	{{--  page scripts  --}}
	@yield('scripts')
</body>
</html>
