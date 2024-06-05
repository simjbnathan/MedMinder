using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using medminder_api.Models;

namespace medminder_api.Repositories
{
    public interface IPatientRepository
    {
        Task<List<Patient>> GetPatientsAsync();
        Task<Patient> GetPatientByIdAsync(int id);
        Task AddPatientAsync(Patient patient);
        Task UpdatePatientAsync(Patient patient);
        Task DeletePatientAsync(int id);
    }
}