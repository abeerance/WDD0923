<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->json('content'); // Store the JSON content here
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('image_id')->nullable()->constrained('images')->nullOnDelete(); // Allow null for image
            $table->timestamps(); // Shortcut for created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('articles');
    }
};
