import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCategories } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function DishesCategory() {
  const categories = await getCategories();

  return (
    <div className="w-292.75 py-6">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" h-[60px] "></div>
      <div className="rounded-md p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Dishes Category</h1>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center rounded-full border border-gray-200 text-sm font-medium text-gray-700 p-2 gap-2">
            All dishes
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-black text-white text-xs font-semibold px-1.5 tabular-nums">
              {categories?.length ?? 0}
            </span>
          </div>

          {categories?.map((category) => (
            <div
              key={category.id}
              className="px-4 py-2 rounded-full border border-gray-200"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {category.name}

                <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-black text-white text-xs font-semibold px-1.5 tabular-nums">
                  {category.foods?.length ?? 0}
                </span>
              </div>
            </div>
          ))}
          <div>
            {" "}
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-0 bg-[#EF4444] text-white w-9 h-9 cursor-pointer"
                  >
                    +
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[460px] h-[272px] rounded-md">
                  <DialogHeader>
                    <DialogTitle>Add new category</DialogTitle>
                  </DialogHeader>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="name-1">Category name</Label>
                      <Input id="name-1" name="name" defaultValue="" />
                    </Field>
                  </FieldGroup>
                  <DialogFooter className="">
                    <Button className="rounded-md w-[123px]" type="submit">
                      Add Category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
