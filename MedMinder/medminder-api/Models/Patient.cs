using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace medminder_api.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public bool IsActive { get; set; }
    }
}