<?php

namespace App\Http\Controllers;


// class LogController extends Controller
// {
//     private $status=200;
//     public function index()
//     {

//         $acc=Users::all();
//         if(count($acc)>0){
//             return response()->json(["status"=>$this->status,"success"=>true,"count"=>count($acc), "data"=>$acc]);
//         }
//         else{
//             return response()->json(["status"=>"failed","success"=>false, "message"=>"whoop? no record found"]);
//         }
//     }


//     public function store(Request $request)
//     {
            
//         $acc=new Users();
//         $acc->name=$request->input('name');
//         $acc->email=$request->input('email');
//         $acc->password=$request->input('password');
//         $acc->save();
//         if($acc) 
//         {            
//             return response()->json(["status" => $this->status, "data" => $acc]);
//         }    
//     }
// }

// use Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use Illuminate\Support\Str;
use App\Models\Users;
use Illuminate\Http\Request;
use GuzzleHttp\Psr7\Message;


class UsersController extends Controller
{
    
    private $status = 200;
    
    public function getIndex()
    {
        $user = Users::all();
        if (count($user) > 0) {
            return response()->json(["status" => $this->status, "success" => true, "count" => count($user), "data" => $user]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "whoop? no record found"]);
        }
    }
  
    function getLogin(Request $request)
    {
        $validator = Validator::make($request->all(), 
        [
            'email'=>'required|email|unique:users,email',
            'password'=>'required|min:6|max:20',
        ],
        [
            'email.required'=>'Vui lòng nhập email',
            'email.email'=>'Không nhập đúng định dạng email',
            'email.unique'=>'Email đã có người sử dụng',
            'password.required'=>'Vui lòng nhập mật khẩu',
            'passowrd.min'=>'Mật khẩu it nhất 6 ký tự'
        ]);

        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag(), "success" => 0]);
        }

        $user = Users::where("email", $request->email)->get();
        if ($user->count() > 0) {
            if ($user[0]->password == $request->password) {
                return Response()->json(["success" => 1, 'user' => $user[0]]);
            }
        }
        return response()->json(['errors' => ['login' => "Login profile does not exist!!"]]);
    }

    function getRegister(Request $request)
    {
        $validator = Validator::make($request->all(), 
        [
            'email'=>'required|email|unique:users,email',
            'password'=>'required|min:6|max:20',
            'name'=>'required',
            'repassword'=>'required|same:password'
        ],
        [
            'name.required'=>'Vui lòng nhập fullname',
            'email.required'=>'Vui lòng nhập email',
            'email.email'=>'Không nhập đúng định dạng email',
            'email.unique'=>'Email đã có người sử dụng',
            'password.required'=>'Vui lòng nhập mật khẩu',
            'repassword.required'=>'Vui lòng xác nhận lại mật khẩu',
            'repassword.same'=>'Mật khẩu không giống nhau',
            'passowrd.min'=>'Mật khẩu it nhất 6 ký tự'
        ]);

        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag(), "success" => 0]);
        }

        $find = Users::where('email', $request->email)->get();
        if ($find->count() > 0) {
            return response()->json(["errors" => ['register' => 'Account already exists!']]);
        }

        $new = new Users;
        $new->email = $request->email;
        $new->password = $request->password;
        $new->name = $request->name;

        $new->save();
        return response()->json(["success" => 1]);
    }


    function getForgot(Request $request)
    {
        $email=$request->email;
        $validator = Validator::make($request->all(), 
        [
            'email'=>'required|email|unique:users,email',
        ],
        [
            'email.required'=>'Vui lòng nhập email',
            'email.email'=>'Không nhập đúng định dạng email',
            'email.unique'=>'Email đã có người sử dụng',
        ]);    

        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag(), "success" => 0]);
        }

        $update=Users::where('email', $email)->first();
        if (!isset( $update )) {
            return response()->json(["errors" => ['message' => 'Account does not exists!']]);
        }else{
            $random_password = Str::random(12);
            $content = [
                'title'=>'Hi ! This is your password forgot:',
                'password'=>$random_password
            ];
           
            $update->password=$random_password;
            $update->save();
            Mail::to($email)->send(new SendMail($content));
            return response()->json(["success"=>1]);
        }
      
    }

}

