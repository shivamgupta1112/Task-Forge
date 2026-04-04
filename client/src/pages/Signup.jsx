import { useState } from "react";
import { useNavigate } from "react-router";
import api from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {
    try {
      const res = await api.register(form.email, form.phone, form.password);
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("taskforge-token", data.token);
        navigate("/");
      }

    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      
      <Card className="w-[350px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Sign Up for TaskForge
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <Label>Email</Label>
            <Input name="email" onChange={handleChange} />
          </div>

          <div>
            <Label>Phone</Label>
            <Input name="phone" onChange={handleChange} />
          </div>

          <div>
            <Label>Password</Label>
            <Input name="password" type="password" onChange={handleChange} />
          </div>

          <Button className="w-full" onClick={handleSignup}>
            Sign Up
          </Button>

        </CardContent>
      </Card>

      <p 
        className="mt-4 text-sm text-muted-foreground cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Already have an account?{" "}
        <span className="underline hover:text-foreground">
          Log in
        </span>
      </p>

    </div>
  );
};

export default Signup;