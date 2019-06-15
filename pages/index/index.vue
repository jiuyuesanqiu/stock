<template>
	<view class="text-center text-df border radius">
		<view class="grid col-5 py-2">
			<view>代码</view>
			<view>名称</view>
			<view>最新价</view>
			<view>估值</view>
			<view>是否低估</view>
		</view>
		<view  class="grid col-5 py-1" v-for="(item,index) in tableList" :key="index">
			<view>
				000001
			</view>
			<view>
				上证指数
			</view>
			<view>
				2852.13
			</view>
			<view>
				2500
			</view>
			<view>
				是
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tableList:[1,2,3,4,5,6,7,8,9,10]
			}
		},
	}
</script>

<style>
</style>
