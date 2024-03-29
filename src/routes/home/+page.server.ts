import type { PageServerLoad } from '@sveltejs/kit';

import prisma from '$root/lib/prisma';
import { timePosted } from '$root/utils/date';

export const load: PageServerLoad = async () => {
	// get the tweets and the user data (Prisma 😍)
	const data = await prisma.tweet.findMany({
		include: { user: true },
		orderBy: { posted: 'desc' }
	});

	// get the liked tweets
	const liked = await prisma.liked.findMany({
		where: { userId: 1 },
		select: { tweetId: true }
	});

	// we just want an array of the ids
	const likedTweets = Object.keys(liked).map((key) => liked[key].tweetId);

	// we can shape the data however we want
	// so our user doesn't have to pay the cost for it
	const tweets = data.map((tweet) => {
		return {
			id: tweet.id,
			content: tweet.content,
			likes: tweet.likes,
			posted: timePosted(tweet.posted),
			url: tweet.url,
			avatar: tweet.user.avatar,
			handle: tweet.user.handle,
			name: tweet.user.name,
			liked: likedTweets.includes(tweet.id)
		};
	});

	/*
	if (!tweets) {
		return {
			...new Response(),
			status: 400
		};
	}
	*/

	/*
	return {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'max-age=0, s-maxage=60'
		},
		status: 200,
		body: { tweets }
	};
	*/
	return { tweets }
};
