<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->text('content'); // Content of the comment
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // Foreign key to users table
            $table->foreignId('article_id')->constrained()->cascadeOnDelete(); // Foreign key to articles table
            $table->timestamps(); // Created_at and updated_at timestamps
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
