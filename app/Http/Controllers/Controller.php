<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function returnErrors(string $route, string $errors): RedirectResponse
    {
        return Redirect::to($route)->withErrors(['msg_error' => $errors]);
    }

    protected function returnMessage(string $type, string $message, string $route): RedirectResponse
    {
        session(['message_type' => $type]);
        session(['message' => $message]);
        return Redirect::to($route);
    }

    public function returnSuccess(string $route, string $message): RedirectResponse
    {
        return $this->returnMessage("success", $message, $route);
    }

    public function returnWarning(string $route, string $message): RedirectResponse
    {
        return $this->returnMessage("warning", $message, $route);
    }

    public function returnInfo(string $route, string $message): RedirectResponse
    {
        return $this->returnMessage("info", $message, $route);
    }

    public function returnPrimary(string $route, string $message): RedirectResponse
    {
        return $this->returnMessage("primary", $message, $route);
    }

    public function inertiaRender(string $component, array $data = []): Response
    {
        $text = session('message', null);
        $data['message'] = null;
        if ($text !== null) {
            $data['message'] = [
                "text" => $text,
                "type" => session('message_type', "info"),
            ];

            switch ($data['message']['type']) {
                case "info":
                    $data['message']['title'] = "Info.";
                    break;
                case "warning":
                    $data['message']['title'] = "Atenção!";
                    break;
                case "danger":
                    $data['message']['title'] = "Ops...";
                    break;
                case "success":
                    $data['message']['title'] = "Sucesso!";
                    break;
                default:
                    $data['message']['title'] = "";
            }
        }

        request()->session()->forget('message');
        request()->session()->forget('message_type');

        return Inertia::render($component, $data);
    }
}
