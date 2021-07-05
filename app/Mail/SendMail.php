<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;
    public $sendData;
    public function __construct($sendData)
    {
        $this->sendData = $sendData;
    }

    
    public function build()
    {
        return $this->subject('Mật khuẩn mới của bạn')->view('emails.interfaceEmail',[
            'sendData' => $this->sendData
        ]);
    }
}
