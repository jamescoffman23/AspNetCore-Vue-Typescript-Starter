using System;
using System.Collections.Generic;
using System.Reflection;

namespace AspNetCoreVueTypescriptStarter.Infrastructure.Enums
{
    public abstract class Enumeration : IComparable
    {
        public string Name { get; }
        public int Id { get; }

        protected Enumeration()
        {
        }

        protected Enumeration(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public override string ToString()
        {
            return Name;
        }

        public static IEnumerable<T> GetAll<T>() where T : Enumeration, new()
        {
            var type = typeof(T);
            var fields = type.GetTypeInfo().GetFields(BindingFlags.Public |
                                                      BindingFlags.Static |
                                                      BindingFlags.DeclaredOnly);
            foreach (var info in fields)
            {
                var instance = new T();
                if (info.GetValue(instance) is T locatedValue)
                {
                    yield return locatedValue;
                }
            }
        }

        public override bool Equals(object obj)
        {
            if (!(obj is Enumeration otherValue))
            {
                return false;
            }
            var typeMatches = GetType() == obj.GetType();
            var valueMatches = Id.Equals(otherValue.Id);
            return typeMatches && valueMatches;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }

        public int CompareTo(object other)
        {
            return Id.CompareTo(((Enumeration)other).Id);
        }

        // Other utility methods ...
    }
}
