<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;
  
    // public $timestamps=false;
    protected $table='User';
    protected $fillable = ['name','email','password'];
}
