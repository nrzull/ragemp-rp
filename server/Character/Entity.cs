using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Project.Server.Character
{
    public class Entity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Sex { get; set; }
        public Shared.Schemes.CharacterCustomization Customization { get; set; }
        public Account.Entity Account { get; set; }

        public Entity(string firstName, string lastName, string sex, Shared.Schemes.CharacterCustomization customization)
        {
            FirstName = firstName;
            LastName = lastName;
            Sex = sex;
            Customization = customization;
        }
    }

    public class EntityConfiguration : IEntityTypeConfiguration<Entity>
    {
        public void Configure(EntityTypeBuilder<Entity> builder)
        {
            builder.Property(t => t.Customization)
            .HasConversion(
                v => JsonConvert.SerializeObject(v, Database.JsonSettings),
                v => JsonConvert.DeserializeObject<Shared.Schemes.CharacterCustomization>(v, Database.JsonSettings)
            );
        }
    }
}
