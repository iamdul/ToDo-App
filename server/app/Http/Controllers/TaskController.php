<?php

namespace App\Http\Controllers;

use App\Models\Task;


use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum',except:['index'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Task::with('user')->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'=>'required|max:255',
            'status'=>'boolean'
        ]);

        $task =$request->user()->tasks()->create($data);
        return ['task' => $task];
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        Gate::authorize('modify', $task);

        $data = $request->validate([
            'name'=>'required|max:255',
            'status'=>'boolean'
        ]);

        $task->update($data);
        return ['task' => $task];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        Gate::authorize('modify',$task);

        $task->delete();
        return ['message' => 'Task was deleted successfully'];
    }
}
