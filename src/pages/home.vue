<template>
	<div>
		<div>首页</div>
		<router-link :to="{name:'adminHome'}">
			<div>后台管理端</div>
		</router-link>
		<router-link :to="{name:'shopHome'}">
			<div>商家端</div>
		</router-link>
	</div>
</template>