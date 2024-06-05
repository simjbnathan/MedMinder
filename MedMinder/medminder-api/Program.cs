using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using medminder_api.Data;
using medminder_api.Repositories;
using medminder_api.Services;
using medminder_api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseInMemoryDatabase("PatientDb");
});

builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IPatientService, PatientService>();

builder.Services.AddControllers(); // Add this line to add controller services

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<ApplicationDbContext>();

    // Ensure the database is created
    dbContext.Database.EnsureCreated();

    // Check if there are any existing patients
    if (!dbContext.Patients.Any())
    {
        // If no patients exist, seed the database with sample data
        dbContext.Patients.AddRange(new List<Patient>
        {
            new Patient { FirstName = "Jonathan", LastName = "Zerda", City = "Surigao", IsActive = true },
            new Patient { FirstName = "John", LastName = "Fruciante", City = "Los Angeles", IsActive = true },
            new Patient { FirstName = "Chad", LastName = "Smith", City = "Chicago", IsActive = false }
            // Add more sample patients as needed
        });

        // Save changes to the database
        dbContext.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();

