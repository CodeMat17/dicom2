export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  imageUrl: string;
  email: string;
  profile: string;
}

export interface Team {
  director: TeamMember;
  staff: TeamMember[];
} 