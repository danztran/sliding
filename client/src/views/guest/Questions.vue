<template>
	<div>
		<field-ask />
		<question-tabs>
			<template slot="popular-tab">
				<question-card />
				<question-card />
				<question-card />
				<question-card />
				<question-card />
				<question-card />
				<question-card />
			</template>

			<template slot="recent-tab">
				<question-card />
				<question-card />
				<question-card />
				<question-card />
				<question-card />
			</template>
		</question-tabs>
	</div>
</template>

<script>
import FieldAsk from '@/components/questions/guest/FieldAsk.vue';
import QuestionTabs from '@/components/questions/guest/QuestionTabs.vue';
import QuestionCard from '@/components/questions/guest/QuestionCard.vue';

export default {
	name: 'Questions',
	components: {
		'field-ask': FieldAsk,
		'question-tabs': QuestionTabs,
		'question-card': QuestionCard
	}
};
</script>

<style lang="scss">
</style>
