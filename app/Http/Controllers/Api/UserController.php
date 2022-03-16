<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserInfo;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('id', 'desc')->paginate(4);

        return response()->json($users, 200);
    }

    public function store(Request $request)
    {
        $data = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            'addresses.address' => 'required',
            'addresses.address.*' => 'required',
            'addresses.cities' => 'required',
            'addresses.cities.*' => 'required',
            'addresses.state' => 'required',
            'addresses.state.*' => 'required',
            'addresses.country' => 'required',
            'addresses.country.*' => 'required',
            'addresses.zipcode' => 'required',
            'addresses.zipcode.*' => 'required',
            'addresses.home_number' => 'required',
            'addresses.home_number.*' => 'required',
        ]);

        if ($data->fails()) {
            return response()->json([
                'errors' => $data->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $addresses = $request->addresses;

        foreach ($addresses['address'] as $key => $userAddress) {
            UserInfo::create([
                'user_id'      => $user->id,
                'address'      => $userAddress,
                'city'         => $addresses['cities'][$key],
                'state'        => $addresses['state'][$key],
                'country'      => $addresses['country'][$key],
                'zipcode'      => $addresses['zipcode'][$key],
                'home_number'  => $addresses['home_number'][$key]
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'User added successfully!',
        ], 200);
    }

    public function userInfo(Request $request, $id)
    {
        $user = User::with('userInfo')->find($id);

        return response()->json([
            'status' => true,
            'user' => $user
        ], 200);
    }
}
