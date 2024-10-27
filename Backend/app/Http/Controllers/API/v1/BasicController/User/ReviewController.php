<?php

namespace App\Http\Controllers\API\v1\BasicController\User;

use App\Http\Requests\Store\ReviewStoreRequest;
use App\Http\Requests\Update\ReviewUpdateRequest;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\UserResource;
use App\Models\Review;
use App\Models\User;
use DivisionByZeroError;
use Illuminate\Http\Request;

class ReviewController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $review = Review::all();
        $review->load(['reviewedFor']);
        return ReviewResource::collection($review);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ReviewStoreRequest $request)
    {
        $data = $request->validated();
        try{
            $userToReview = User::where('id', $data['reviewed_for'])->first();
            $alreadyReview = Review::where('reviewed_by', $data['reviewed_by'])
                                ->where('reviewed_for', $data['reviewed_for'])
                                ->exists();
            if($alreadyReview){
                return response()->json(['message' => 'You already gave review to this employer!'],402);
            }
            $userToReview->load(['myReviews']);
            $denaminator = $userToReview->myReviews->count();
            $sum = 0;
            foreach($userToReview->myReviews as $review){
                $sum += $review->rate;
            }
            $rating = (($sum/$denaminator)+ $data['rate'])/2;
            $newRating = number_format($rating, 2);
            $userToReview['rating'] = $newRating;
            $userToReview->update();
    
            $review = Review::create($data);
            $review->load(['reviewedFor','reviewedBy']);
            return ReviewResource::make($review);
        } catch(DivisionByZeroError $e){
            $review = Review::create($data);
            $review->load(['reviewedFor','reviewedBy']);
            $newRating = ['rating' => $review->rate];
            $review->reviewedFor->update($newRating);
            return ReviewResource::make($review);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        $review->load(['reviewedBy', 'reviewedFor']);
        return ReviewResource::make($review);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReviewUpdateRequest $request, Review $review)
    {
        $review->update($request->validated());
        $review->load(['reviewedFor.myReviews']);
        $user = $review->reviewedFor;
        $newReviews = $user->myReviews;
        
        $denaminator = $newReviews->count();
        $sum = 0;
        foreach($newReviews as $rev){
            $sum += $rev->rate;
        }
        $rating = $sum/$denaminator;
        $formatRate = number_format($rating, 2);
        $user['rating'] = $formatRate;
        $user->update();
        return ReviewResource::make($review);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $review->load(['reviewedFor.myReviews']);
        $user = $review->reviewedFor;
        $review->delete();
        $existingReview = Review::where('reviewed_for', $user->id)->get();
        $denaminator = $existingReview->count();
        $sum = 0;
        foreach($existingReview as $rev){
            $sum += $rev->rate;
        }
        $rating = $sum/$denaminator;
        $formatRate = number_format($rating, 2);
        $user['rating'] = $formatRate;
        $user->update();
        return UserResource::make($user);
    }
}
