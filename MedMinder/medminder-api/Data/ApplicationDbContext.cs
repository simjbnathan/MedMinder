using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using medminder_api.Models;
using Microsoft.EntityFrameworkCore;

namespace medminder_api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
    }
}