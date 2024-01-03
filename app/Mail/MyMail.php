<?php

namespace App\Mail;

use App\Models\LaporanPengaduan;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class MyMail extends Mailable
{
    use Queueable, SerializesModels;
    private LaporanPengaduan $laporan_pengaduan;
    private string $name;

    /**
     * Create a new message instance.
     */
    public function __construct(LaporanPengaduan $laporan_pengaduan)
    {
        $this->laporan_pengaduan = $laporan_pengaduan;
        // $this->name = $laporan_pengaduan->user->name;
        // buatkan agar name kalau ada spasi jadi %20
        $this->name = str_replace(' ', '%20', $laporan_pengaduan->user->name);
    }



    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Notification Sistem Pengaduan ' . config('app.name', ''),

        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.notification',
            with: [
                'user' => $this->laporan_pengaduan->user,
                'url' => config('app.url', ''),
                'data_pengaduan' => $this->laporan_pengaduan,
                'name' => $this->name,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
